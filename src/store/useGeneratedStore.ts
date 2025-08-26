import {
  generatedImagesAction,
  storeImages,
} from "@/app/actions/image-actions";
import { ImaegGenerationFormSchema } from "@/components/image-generation/configs";
import { toast } from "sonner";
import z from "zod";
import { create } from "zustand";

interface GenerateState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (
    values: z.infer<typeof ImaegGenerationFormSchema>
  ) => Promise<void>;
}

// Store for the generatd images!!
const useGeneratedStore = create<GenerateState>((set) => ({
  loading: false,
  images: [],
  error: null,

  generateImage: async (values: z.infer<typeof ImaegGenerationFormSchema>) => {
    set({ loading: true, error: null });

    const toastId = toast.loading("Generating Image...");

    try {
      const { error, success, data } = await generatedImagesAction(values);
      if (!success) {
        set({ error: error, loading: false });
        return;
      }

      //   As the data is coming in the form of a url
      const dataIWthUrel = data.map((url: string) => {
        return {
          url,
          ...values,
        };
      });

      set({ images: dataIWthUrel, loading: false });
      toast.success("Image Generated Successfully!", { id: toastId });

      await storeImages(dataIWthUrel);
      toast.success("Image Stored Successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      set({
        error: "Failed to generate Image! Please try again",
        loading: false,
      });
    }
  },
}));

export default useGeneratedStore;
