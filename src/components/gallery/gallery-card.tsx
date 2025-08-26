"use client";

import { Tables } from "@database.types";
import Image from "next/image";
import ImaegSheet from "./image-sheet";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
}

const GalleryCard = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

 if (images.length === 0) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center max-w-md p-8 rounded-2xl shadow-md border border-dashed border-gray-300 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-center mb-4">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No Images Found
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          You haven’t generated any images yet. Start creating to see them here!
        </p>
        <button className="px-5 py-2 rounded-xl bg-primary text-white shadow hover:shadow-lg transition">
          Generate Image
        </button>
      </div>
    </div>
  );
}

  return (
    <section className="container mx-auto py-8">
      <div className="columns-4 gap-4 space-y-4">
        {images?.map((image, index) => {
          return (
            <div key={index}>
              <div
                onClick={() => setSelectedImage(image)}
                className="relative group overflow-hidden cursor-pointer transition-transform"
              >
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70 rounded-2xl">
                  <div className="flex justify-center items-center h-full">
                    <p className="text-primary-foreground font-semibold text-lg">
                      View Details
                    </p>
                  </div>
                </div>
                <Image
                  src={image.url ?? ""}
                  alt={image.prompt ?? ""}
                  width={image.width ?? 0}
                  height={image.height ?? 0}
                  className="object-cover rounded-2xl border border-gray-100 bg-white 
            hover:scale-90
             transition-all duration-300 ease-out"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* pass the selecytedt image detailed */}

      {selectedImage && (
        <ImaegSheet
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GalleryCard;
