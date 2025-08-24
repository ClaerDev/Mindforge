"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useEffect } from "react";
import useGeneratedStore from "@/store/useGeneratedStore";

//  prompt: "a boy holding a banner which says I am Nice boy",
//   go_fast: true,
//   guidance: 3.5,
//   megapixels: "1",
//   num_outputs: 1,
//   aspect_ratio: "1:1",
//   output_format: "webp",
//   output_quality: 80,
//   prompt_strength: 0.8,
//   num_inference_steps: 28

export const ImaegGenerationFormSchema = z.object({
  model: z.string({ message: "Model is required!" }),
  prompt: z.string().min(5, {
    message: "Prompt is required!",
  }),
  guidance: z.number({
    message: "Guidance Scale is required!",
  }),
  num_outputs: z
    .number()
    .min(1, {
      message: "Number of outputs should atleast be 1!",
    })
    .max(3, {
      message: "Number of outputs should be less than 3",
    }),
  aspect_ratio: z.string({
    message: "Aspect Ratio is required!",
  }),
  output_format: z.string({
    message: "Output Format is required!",
  }),
  output_quality: z
    .number()
    .min(1, {
      message: "Output Quality should atleast be 1!",
    })
    .max(100, {
      message: "Output Quality should be less than or equal to 100",
    }),
  num_inference_steps: z
    .number()
    .min(1, {
      message: "Number of inference steps should atleast be 1!",
    })
    .max(50, {
      message: "Number of inference steps should be less than or equal to 50",
    }),
});

const Configuration = () => {
  const generatedImage = useGeneratedStore((state) => state.generateImage);

  const form = useForm<z.infer<typeof ImaegGenerationFormSchema>>({
    resolver: zodResolver(ImaegGenerationFormSchema),
    defaultValues: {
      model: "black-forest-labs/flux-dev",
      prompt: "",
      guidance: 3.5,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "jpg",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });

  useEffect(() => {
    // THIS WATCHES FOR EVEYY WATCH FOR NEW MODELA ND ON THE BASIS OF THAT GIVES A NEW INFERENCE STEPS
    const subscribe = form.watch((value, { name }) => {
      if (name === "model") {
        let newSteps;

        if (value.model === "black-forest-labs/flux-schnell") {
          newSteps = 4;
        } else {
          newSteps = 28;
        }
        if (newSteps !== undefined) {
          form.setValue("num_inference_steps", newSteps);
        }
      }
    });

    return () => subscribe.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof ImaegGenerationFormSchema>) {
    await generatedImage(values);
    console.log(values);
  }
  return (
    <div>
      <TooltipProvider>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <fieldset className="grid gap-6 p-4 bg-background rounded-lg border">
              <legend className="text-sm -ml-0 px-1 font-bold">Settings</legend>
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Model{" "}
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            You can select any model from the
                            dropdown-menu(flux-dev preferred).
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="black-forest-labs/flux-dev">
                          Flux Dev
                        </SelectItem>
                        <SelectItem value="black-forest-labs/flux-schnell">
                          Flux Schnell
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="aspect_ratio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Aspect Ratio{" "}
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Aspect ratio for the generated image</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1:1">1:1</SelectItem>
                          <SelectItem value="16:9">16:9</SelectItem>
                          <SelectItem value="21:9">21:9</SelectItem>
                          <SelectItem value="3:2">3:2</SelectItem>
                          <SelectItem value="2:3">2:3</SelectItem>
                          <SelectItem value="4:5">4:5</SelectItem>
                          <SelectItem value="5:4">5:4</SelectItem>
                          <SelectItem value="3:4">3:4</SelectItem>
                          <SelectItem value="4:3">4:3</SelectItem>
                          <SelectItem value="9:16">9:16</SelectItem>
                          <SelectItem value="9:21">9:21</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="num_outputs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Number of Outputs
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of outputs to generate</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={3}
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="guidance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        Guidance
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Guidance for generated image. Lower values can
                              give more realistic images.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span>{field.value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        min={0}
                        max={10}
                        step={0.5}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="num_inference_steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        Number of Inference Steps
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Recommended range is 28-50 for dev and 1-4 for
                              schnell, and lower number of steps produce lower
                              quality outputs.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span>{field.value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        min={1}
                        max={
                          form.getValues("model") ===
                          "black-forest-labs/flux-schnell"
                            ? 4
                            : 50
                        }
                        step={1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="output_quality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        Output Quality
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Quality when saving the output images, from 0 to
                              100.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span>{field.value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        min={50}
                        max={100}
                        step={1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="output_format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Output Format
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Format of the output images.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a output format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="webp">WebP</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Prompt
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Prompt for generated image.</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
              <Button type="submit" className="font-medium">
                Generate
              </Button>
            </fieldset>
          </form>
        </Form>
      </TooltipProvider>
    </div>
  );
};

export default Configuration;
