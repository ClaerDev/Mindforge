import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useId } from "react";
import { toast } from "sonner";
import { deleteteImages } from "@/app/actions/image-actions";
import { cn } from "@/lib/utils";

interface DeleteImageProps {
  imageId: string;
  onDelete?: () => void;
  className?: string;
  imageName: string;
}

const DeleteImage = ({
  imageId,
  onDelete,
  className,
  imageName,
}: DeleteImageProps) => {
  const toastId = useId();

  const handleDelete = async () => {
    toast.loading("Deleting the Image...", { id: toastId });

    const { error, success } = await deleteteImages(imageId,imageName);
    if (error) {
      toast.error(error, { id: toastId });
    } else if (success) {
      toast.success("Image Deleted Successfully!", { id: toastId });
      onDelete?.();
    } else {
      toast.dismiss(toastId);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className={cn("w-fit flex items-center gap-2", className)}
        >
          <Trash className="w-4 h-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            image and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteImage;
