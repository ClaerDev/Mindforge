"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useId } from "react";
import { getPreseignedStoragUrl } from "@/app/actions/model-actions";

const ACCEPTED_ZIP_FILES = ["application/x-zip-compressed", "application/zip"];
const MAX_FILE_SIZE = 45 * 1024 * 1024;

const formSchema = z.object({
  modelName: z.string().min(1, { message: "Model Name is required!" }),
  gender: z.enum(["man", "woman"]),
  zipFile: z
    .any()
    .refine((files) => files?.[0] instanceof File, "Please select a valid file")
    .refine(
      (files) =>
        files?.[0]?.type && ACCEPTED_ZIP_FILES.includes(files?.[0]?.type),
      "Only zip files are expected!"
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Maximum file size allowed is 45MB"
    ),
});

const ModelTrainingForm = () => {
  const toastId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "",
      gender: "man",
      zipFile: undefined,
    },
  });

  const fileRef = form.register("zipFile");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Uploading file...", { id: toastId });

    try {
      const data = await getPreseignedStoragUrl(values.zipFile[0].name);
      console.log(data); //checking if we tget the data url or not

      if (data.error) {
        toast.error(data.error || "Failed to upload the file", { id: toastId });
        return;
      }

      // if not error uploa d file
      const urlResp = await fetch(data.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": values.zipFile[0].type,
        },
        // stopre the firs tfile
        body: values.zipFile[0],
      });

      if (!urlResp.ok) {
        throw new Error("Upload failed!");
      }

      // this gives the key
      const response = await urlResp.json();
      toast.success("File uploaded successfully!", { id: toastId });

      console.log(response);

      const formDatta = new FormData();
      formDatta.append("fileKey", response.Key);
      formDatta.append("modelName", values.modelName);
      formDatta.append("gender", values.gender);

      // use the /train route

      const responseForTraining = await fetch("/api/training", {
        method: "POST",
        body: formDatta,
      });

      const results = await responseForTraining.json();

      if (!responseForTraining.ok || results?.error) {
        throw new Error(results?.error || "Failed to train the model");
      }

      toast.success(
        "Training started successfully! You'll receive a notification once it get's completed!",
        { id: toastId }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to start training";
      toast.error(errorMessage || "Failed to upload the file", {
        id: toastId,
        duration: 5000,
      });
      return;
    }
    console.log(values);
  }

  return (
    <div className="w-full max-w-3xl ">
      <Card className="shadow-xl rounded-2xl border border-gray-200">
        <CardContent className="p-8 space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Model Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your model name..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be the display name of your trained model.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Dataset Gender
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="man" id="man" />
                          <FormLabel
                            htmlFor="man"
                            className="font-normal cursor-pointer"
                          >
                            Male
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="woman" id="woman" />
                          <FormLabel
                            htmlFor="woman"
                            className="font-normal cursor-pointer"
                          >
                            Female
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Select the primary gender representation in your dataset.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-gray-50 p-3 rounded-xl border text-sm leading-relaxed">
                <p className="font-semibold text-red-600 mb-1">
                  Training Data Requiremants:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Provide 10, 12, or 15 images in total.</li>
                  <li>Ideal breakdown for 12 images:</li>
                  <ul>
                    <li> - 6 face closeups</li>
                    <li> - 3/4 half body closeups (till stomach)</li>
                    <li> - 2/3 full body shots</li>
                  </ul>
                  <li>No accessories on face/head ideally.</li>
                  <li>No other people in images.</li>
                  <li>
                    Ensure different expressions, clothing, backgrounds with
                    good lighting.
                  </li>
                  <li>Images must be 1:1 resolution (1048x1048 or higher).</li>
                  <li>
                    Use images from the same age group (recent preferred).
                  </li>
                  <li>Provide only one zip file (max 45MB).</li>
                </ul>
              </div>

              <FormField
                control={form.control}
                name="zipFile"
                render={({}) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Upload Training Images (Zip)
                    </FormLabel>
                    <FormControl>
                      <Input type="file" accept=".zip" {...fileRef} />
                    </FormControl>
                    <FormDescription>
                      Upload a zip file containing your training images (max
                      45MB).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end mb-10">
                <Button
                  type="submit"
                  size="lg"
                  variant={"default"}
                  className="rounded-xl"
                >
                  Start Training
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelTrainingForm;
