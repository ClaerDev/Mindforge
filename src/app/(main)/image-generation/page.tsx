import Configuration from "@/components/image-generation/configs";
import React from "react";

const ImageGeneration = () => {
  return (
    <section className="container mx-auto grid gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        <Configuration />
      </div>

      <div className="md:col-span-2 p-4 rounded-xl flex items-center justify-center bg-gray-50 shadow-sm">
        <span className="text-gray-500">Output</span>
      </div>
    </section>
  );
};

export default ImageGeneration;
