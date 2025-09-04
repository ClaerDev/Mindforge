import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_URL =
  process.env.SITE_URL ?? " https://2118d30863c1.ngrok-free.app";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("The Replicate API Token is not valid!");
    }

    const suapabase = await createClient();
    const {
      data: { user },
    } = await suapabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const input = {
      fileKey: formData.get("fileKey") as string,
      modelName: formData.get("modelName") as string,
      gender: formData.get("gender") as string,
    };

    if (!input.modelName || !input.fileKey) {
      return NextResponse.json(
        { error: "Missing Fields required!" },
        { status: 400 }
      );
    }

    const fileName = input.fileKey.replace("training_data/", "");
    // get the URL to pass to lora trainer
    const { data: fileUrl } = await supabaseAdmin.storage
      .from("training_data")
      .createSignedUrl(fileName, 3600); //1 hr

    if (!fileUrl?.signedUrl) {
      throw new Error("Failed to get the file URL!");
    }

    // const hardware=await replicate.hardware.list()
    // console.log(hardware)

    const modelId = `${user.id}_${Date.now()}_${input.modelName
      .toLowerCase()
      .replaceAll(" ", "_")}`;

    // first create that model to be used by replicate
    await replicate.models.create("priyansh-narang2308", modelId, {
      visibility: "private",
      hardware: "gpu-a100-large",
    });

    // NOW TSART THE MAIN TRAINIG

    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "26dce37af90b9d997eeb970d92e47de3064d46c300504ae376c75bef6a9022d2",
      {
        // You need to create a model on Replicate that will be the destination for the trained version.
        destination: `priyansh-narang2308/${modelId}`,
        input: {
          steps: 1000,
          resolution: "1024",
          input_images: fileUrl.signedUrl, //jo signed url key aaya tha use that here
          trigger_word: "ohwx",
        },
        webhook: `${WEBHOOK_URL}/api/webhooks/training?userId=${
          user.id
        }&modelName=${encodeURIComponent(
          input.modelName
        )}&fileName=${encodeURIComponent(fileName)}`,
webhook_events_filter: ["start", "completed"],
      }
    );

    // add the models values to suapabase
    await supabaseAdmin.from("models").insert({
      model_id: modelId,
      user_id: user.id,
      model_name: input.modelName,
      gender: input.gender,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      training_status: training.status as any,
      trigger_word: "ohwx",
      training_steps: 1200,
      training_id: training.id,
    });

    // console.log(training);

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Training the model error: ", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to start the model training!";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
