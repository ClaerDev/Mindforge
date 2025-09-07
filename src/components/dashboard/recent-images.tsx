import { Tables } from "@database.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface RecentImageProps {
  images: Array<
    Tables<"generated_images"> & {
      url?: string;
    }
  >;
}

const RecentImages = ({ images }: RecentImageProps) => {
  if (!images || images?.length === 0) {
    return (
      <Card className="col-span-3 hover:border-muted-foreground/50 transition-colors">
        {" "}
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            Recent Generations
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-10">
          <p className="text-muted-foreground text-base text-center">
            No images generated yet. Start creating your first one now.
          </p>
          <Button asChild>
            <Link href="/image-generation" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Generate Image
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 border-dashed hover:border-muted-foreground/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          Recent Generations
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-4 py-10">
        <Carousel className="w-full ">
          <CarouselContent>
            {images?.map((image) => (
              <CarouselItem
                key={image.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="space-y-2">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg",
                      image?.height && image?.width
                        ? `aspect-[${image.width / image.height}]`
                        : "aspect-square"
                    )}
                  >
                    <Image
                      src={image?.url || ""}
                      alt="image generated"
                      width={image.width || 100}
                      height={image.height || 100}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.prompt}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <div className="w-full flex justify-end">
          <Link href="/gallery">
            <Button variant="default" size="sm">
              View Gallery <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentImages;
