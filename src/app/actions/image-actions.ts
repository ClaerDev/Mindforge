/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ImaegGenerationFormSchema } from "@/components/image-generation/configs";
import { z } from "zod";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput:false //to not gve in stream foemat
});

interface ImagResponse {
  error: string | null;
  success: boolean;
  data: any | null;
}

export async function generatedImagesAction(
  input: z.infer<typeof ImaegGenerationFormSchema>
): Promise<ImagResponse> {
  const modelInput = {
    prompt: input.prompt,
    go_fast: true,
    guidance: input.guidance,
    megapixels: "1",
    num_outputs: input.num_outputs,
    aspect_ratio: input.aspect_ratio,
    output_format: input.output_format,
    output_quality: input.output_quality,
    prompt_strength: 0.8,
    num_inference_steps: input.num_inference_steps,
  };

  try {
    const output = await replicate.run(input.model as `${string}/${string}`, {
      input: modelInput,
    });
    console.log("Output: ",output)

    return {
      error: null,
      success: true,
      data: output,
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message || "Failed to generate image!",
      success: false,
      data: null,
    };
  }
}
