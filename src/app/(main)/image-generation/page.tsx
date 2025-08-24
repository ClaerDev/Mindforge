import Configuration from "@/components/image-generation/configs";
import GeneratedImages from "@/components/image-generation/generated-images";
import React from "react";

const ImageGeneration = () => {
  return (
    <section className="container mx-auto grid gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        <Configuration />
      </div>

      <div className="md:col-span-2 p-4 h-fit rounded-xl flex items-center justify-center shadow-sm">
        <GeneratedImages />
      </div>
    </section>
  );
};

export default ImageGeneration;
