import { NextResponse } from "next/server";
import Replicate from "replicate";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";

// ✅ Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ✅ Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("Webhook is working!! ", req);

  try {
    const body = await req.json();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") ?? "";
    const modelName = url.searchParams.get("modelName") ?? "";
    const fileName = url.searchParams.get("fileName") ?? "";

    // ✅ Validate webhook signature
    const id = req.headers.get("webhook-id") ?? "";
    const timeStamp = req.headers.get("webhook-timestamp") ?? "";
    const webhookSignature = req.headers.get("webhook-signature") ?? "";

    const signedContent = `${id}.${timeStamp}.${JSON.stringify(body)}`;
    const secret = await replicate.webhooks.default.secret.get();
    const secretBytes = Buffer.from(secret.key.split("_")[1], "base64");
    const signature = crypto
      .createHmac("sha256", secretBytes)
      .update(signedContent)
      .digest("base64");

    const expectedSignatures = webhookSignature
      .split(" ")
      .map((sig) => sig.split(",")[1]);
    const isValid = expectedSignatures.some(
      (expectedSignature) => expectedSignature === signature
    );

    if (!isValid) {
      return new NextResponse("Invalid Signature", { status: 401 });
    }

    // ✅ Get user from Supabase
    const { data: user, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !user) {
      return new NextResponse("No User found", { status: 401 });
    }

    const userEmail = user.user.email ?? "";
    const userName = user.user.user_metadata.full_name ?? "";

    // ✅ Helper to send emails via Resend
    async function sendEmail(to: string, subject: string, htmlContent: string) {
      return resend.emails.send({
        from: "Visionary AI <onboarding@resend.dev>",
        to: [to],
        subject,
        html: htmlContent,
      });
    }

    // ✅ Handle training success / failure
    if (body.status === "succeeded") {
      await sendEmail(
        userEmail,
        "Model Training Successfully Completed",
        `<h1>Hello, ${userName}!</h1><p>Your model training has been successfully completed!</p>`
      );

      await supabaseAdmin
        .from("models")
        .update({
          training_status: body.status,
          training_time: body.metrics?.total_time ?? null,
          version: body.output?.version.split(":")[1] ?? null,
        })
        .eq("user_id", userId)
        .eq("model_name", modelName);
    } else {
      await sendEmail(
        userEmail,
        `Model Training ${body.status}`,
        `<h1>Hello, ${userName}!</h1><p>Your model training has been ${body.status}!</p>`
      );

      await supabaseAdmin
        .from("models")
        .update({
          training_status: body.status,
        })
        .eq("user_id", userId)
        .eq("model_name", modelName);

        // fetch old credits
      const { data: oldCredits, error } = await supabaseAdmin
        .from("credits")
        .select("model_training_count")
        .eq("user_id", userId)
        .single();

      if (error) {
        throw new Error("Error fetching user credits!");
      }

      // update the credits
      await supabaseAdmin
        .from("credits")
        // increase the count by 1 now
        .update({ model_training_count: oldCredits?.model_training_count + 1 })
        .eq("user_id", userId)
        .single();
    }

    // ✅ Remove training file from storage
    await supabaseAdmin.storage.from("training_data").remove([`${fileName}`]);

    console.log("Webhook is fine!! ", body);

    return new NextResponse("Ok", { status: 200 });
  } catch (error) {
    console.log("Webhook Processing Error: ", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
