"use client";

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
import { ImageOff } from "lucide-react";

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

  if (!images || images.length === 0) {
    return (
      <Card className="w-full max-w-2xl bg-muted shadow-md rounded-2xl">
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-inner">
              <ImageOff className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-2xl font-semibold text-foreground">
              No images yet
            </h2>

            <p className="text-sm text-muted-foreground max-w-sm">
              You haven’t generated any images so far. Enter a prompt in the box
               and let your imagination take shape. Our AI will instantly
              transform your words into unique visuals.
            </p>

            <ul className="text-sm text-black space-y-1 max-w-sm">
              <li>✨ Use descriptive prompts for better results</li>
              <li>
                🎨 Try adding styles like{" "}
                <i>realistic, watercolor, futuristic</i>
              </li>
              <li>⚡ Generate multiple variations to explore ideas</li>
            </ul>
          </div>
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
