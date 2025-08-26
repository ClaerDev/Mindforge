import { Tables } from "@database.types";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

import Image from "next/image";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { Badge } from "../ui/badge";
import DeleteImage from "./delete-image";

interface ImageSheetProps {
  image: { url: string | undefined } & Tables<"generated_images">;
  onClose: () => void;
}

const ImaegSheet = ({ image, onClose }: ImageSheetProps) => {
  const handleDownload = async () => {
    try {
      const res = await fetch(image.url ?? "");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `generated-image-${Date.now()}.${image?.output_format}`;
      link.click();
      URL.revokeObjectURL(link.href); // cleanup
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="space-y-6 max-w-full sm:max-w-xl w-full p-6 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-primary">
            Image Details
          </SheetTitle>
        </SheetHeader>

        <div className="w-full flex justify-center">
          <div className="rounded-2xl overflow-hidden max-h-[450px]">
            <Image
              src={image.url ?? ""}
              alt={image.prompt ?? ""}
              width={image.width ?? 700}
              height={image.height ?? 700}
              className="object-contain max-w-full h-auto"
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <Button
            onClick={handleDownload}
            variant="default"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <DeleteImage
            imageId={image.id.toString()}
            onDelete={onClose}
            className="w-fit"
            imageName={image.image_name}
          />
        </div>

        <hr className="border-primary/30" />

        <div>
          <p className="text-xl font-semibold text-primary mb-2">
            Prompt{" "}
            <span className="text-xs text-gray-600">
              {" "}
              (Scroll Down for more)
            </span>
          </p>
          <ScrollArea className="h-32 rounded-md border border-primary/20 p-3 bg-muted/30">
            <p className="text-lg text-primary/80 whitespace-pre-wrap">
              {image.prompt}
            </p>
          </ScrollArea>
        </div>

        <hr className="border-primary/30" />

        <div className="flex flex-wrap gap-3">
          <Badge
            variant="secondary"
            className="rounded-full hover:bg-gray-300 px-4 py-2 text-sm font-medium bg-primary/10 text-primary"
          >
            <span className="font-semibold mr-1">Model:</span> {image.model}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full hover:bg-gray-300 px-4 py-2 text-sm font-medium bg-primary/10 text-primary"
          >
            <span className="font-semibold mr-1">Aspect:</span>{" "}
            {image.aspect_ratio}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full hover:bg-gray-300 px-4 py-2 text-sm font-medium bg-primary/10 text-primary"
          >
            <span className="font-semibold mr-1">Size:</span> {image.width}×
            {image.height}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full hover:bg-gray-300 px-4 py-2 text-sm font-medium bg-primary/10 text-primary"
          >
            <span className="font-semibold mr-1">Guidance:</span>{" "}
            {image.guidance}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full px-4 hover:bg-gray-300 py-2 text-sm font-medium bg-primary/10 text-primary"
          >
            <span className="font-semibold mr-1">Steps:</span>{" "}
            {image.num_inference_steps}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full px-4 hover:bg-gray-300 py-2 text-sm font-medium bg-primary/10 text-primary"
          >
            <span className="font-semibold mr-1">Format:</span> .
            {image.output_format}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full hover:bg-gray-300 px-4 py-2 text-sm font-medium bg-primary/10 text-primary"
          >
            <span className="font-semibold mr-1">Created:</span>{" "}
            {new Date(image.created_at).toLocaleDateString()}
          </Badge>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ImaegSheet;
