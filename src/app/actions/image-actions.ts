/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ImaegGenerationFormSchema } from "@/components/image-generation/configs";
import { z } from "zod";

import Replicate from "replicate";
import { createClient } from "@/lib/supabase/server";

import { Database } from "@database.types";

import { imageMeta } from "image-meta";
import { randomUUID } from "crypto";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  useFileOutput: false, //to not gve in stream foemat
});

interface ImagResponse {
  error: string | null;
  success: boolean;
  data: any | null;
}

export async function generatedImagesAction(
  input: z.infer<typeof ImaegGenerationFormSchema>
): Promise<ImagResponse> {
  if (!process.env.REPLICATE_API_TOKEN) {
    return {
      error: "The Replicate API Token is not valid!",
      success: false,
      data: null,
    };
  }

  const modelInput = input.model.startsWith("priyansh-narang2308/")
    ? {
        model: "dev",
        prompt: input.prompt,
        lora_scale: 1,
        guidance: input.guidance,
        num_outputs: input.num_outputs,
        aspect_ratio: input.aspect_ratio,
        output_format: input.output_format,
        output_quality: input.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps,
        extra_lora_scale: 0,
      }
    : {
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
    console.log("Output: ", output);

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

// To convert he image to blob
export async function imgUrlToBlob(url: string) {
  const resposse = fetch(url);
  const blob = (await resposse).blob();
  return (await blob).arrayBuffer();
}

type StoreImagegInput = {
  url: string;
} & Database["public"]["Tables"]["generated_images"]["Insert"];

export async function storeImages(data: StoreImagegInput[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  const uploadResults = [];

  for (const image of data) {
    // convert to blob image
    const arrayBuffer = await imgUrlToBlob(image.url);
    // using imagemeta for width and heigt
    const { width, height, type } = imageMeta(new Uint8Array(arrayBuffer));

    const fileName = `image_${randomUUID()}.${type}`;
    const filePath = `${user?.id}/${fileName}`;

    const { error: storageError } = await supabase.storage
      .from("generated_images")
      .upload(filePath, arrayBuffer, {
        contentType: `image/${type}`, //image/png or jpg or other
        cacheControl: "3600", //1hr
        upsert: false,
      });

    if (storageError) {
      uploadResults.push({
        fileName,
        error: storageError.message,
        success: false,
        data: null,
      });
      continue;
    }

    const { data: dbData, error: databasaeError } = await supabase
      .from("generated_images")
      .insert([
        {
          user_id: user?.id,
          model: image.model,
          prompt: image.prompt,
          aspect_ratio: image.aspect_ratio,
          guidance: image?.guidance,
          num_inference_steps: image.num_inference_steps,
          output_format: image.output_format,
          image_name: fileName,
          width,
          height,
        },
      ])
      .select();

    if (databasaeError) {
      uploadResults.push({
        fileName,
        error: databasaeError.message,
        success: !databasaeError,
        data: dbData || null,
      });
    } else {
      uploadResults.push({
        fileName,
        error: null,
        success: true,
        data: dbData,
      });
    }
  }
  console.log("UPLOADED RESULTS: ", uploadResults);

  return {
    error: null,
    success: true,
    data: { results: uploadResults },
  };
}

// TO FETCH THE IMAGES
export async function fetchImages(limit?: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }

  // get all deatiedl of a the particauar user
  let query = supabase
    .from("generated_images")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    return {
      error: error.message || "Failed to fetch images",
      success: false,
      data: null,
    };
  }

  const imageWithUrls = await Promise.all(
    data.map(
      async (
        image: Database["public"]["Tables"]["generated_images"]["Row"]
      ) => {
        const { data } = await supabase.storage
          // from the docs
          .from("generated_images")
          .createSignedUrl(`${user.id}/${image.image_name}`, 3600);

        // this can be passedin the frotend
        return { ...image, url: data?.signedUrl };
      }
    )
  );

  return {
    error: null,
    success: true,
    data: imageWithUrls || null,
  };
}

export async function deleteteImages(id?: string, imageName?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
      success: false,
      data: null,
    };
  }
  const { data, error } = await supabase
    .from("generated_images")
    .delete()
    .eq("id", id);
  if (error) {
    return { error: error.message, success: false, data: null };
  }

  // DELET FROMT E storage as well right!!
  await supabase.storage
    .from("generated_images")
    // also provide the name of tje imahe as well
    .remove([`${user.id}/${imageName}`]);

  return {
    error: null,
    success: true,
    data: data,
  };
}
