import { fetchImages } from "@/app/actions/image-actions";
import GalleryCard from "@/components/gallery/gallery-card";
import React from "react";

const Gallery = async () => {
  const { data: images } = await fetchImages();

  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-2">My Images</h1>
      <p className="text-muted-foreground mb-6 ">
        Here you can see all images you have generated. Click on an image to
        view the details.
      </p>
      <GalleryCard images={images || []} />
    </section>
  );
};

export default Gallery;
