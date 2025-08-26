"use client"

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useGeneratedStore from "@/store/useGeneratedStore";

// const images = [
//   {
//     src: "/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg",
//     alt: "sample",
//   },
//   {
//     src: "/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg",
//     alt: "sample",
//   },
//   {
//     src: "/hero-images/Confident Woman in Red Outfit.jpeg",
//     alt: "sample",
//   },
//   {
//     src: "/hero-images/Confident Woman in Urban Setting.jpeg",
//     alt: "sample",
//   },
// ];

const GeneratedImages = () => {
  const images = useGeneratedStore((state) => state.images);
  // const loading = useGeneratedStore((state) => state.loading);

  if (images?.length == 0) {
    return (
      <Card className="w-full max-w-2xl bg-muted">
        <CardContent className="flex aspect-square items-center  justify-center p-6">
          <span className="text-2xl ">No images generated yet...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className=" flex relative items-center justify-center rounded-lg overflow-hidden aspect-square">
              <Image
                src={image.url}
                alt={"Generated Image"}
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GeneratedImages;
