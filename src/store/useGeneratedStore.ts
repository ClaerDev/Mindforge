import { generatedImagesAction } from "@/app/actions/image-actions";
import { ImaegGenerationFormSchema } from "@/components/image-generation/configs";
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
        };
      });

      set({ images: dataIWthUrel, loading: false });
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
