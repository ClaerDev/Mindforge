import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Webhook is working!! ", req);

  try {
    const body = await req.json();

    console.log("Webhook is fine!! ", body);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("Webhook Processng Error: ", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
