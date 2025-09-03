import { fetchModels } from "@/app/actions/model-actions";
import Configuration from "@/components/image-generation/configs";
import GeneratedImages from "@/components/image-generation/generated-images";
import React from "react";

interface SearchParams {
  model_id: string;
}

const ImageGeneration = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const model_id = (await searchParams).model_id;
  const { data: userModels } = await fetchModels();

  return (
    <section className="container mx-auto grid gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        <Configuration userModels={userModels || []} model_id={model_id} />
      </div>

      <div className="md:col-span-2 p-4 h-fit rounded-xl flex items-center justify-center shadow-sm">
        <GeneratedImages />
      </div>
    </section>
  );
};

export default ImageGeneration;
