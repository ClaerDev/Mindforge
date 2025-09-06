import React from "react";
import { Badge } from "../ui/badge";
import { ImageIcon, Package2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dashboard from "@/public/dashboard.png";

const featureList = [
  {
    title: "AI-Powered Photos",
    description:
      "Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.",
    icon: <ImageIcon className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    title: "Train Your Own Model with Replicate",
    description:
      "Our app empowers users to train their own AI model seamlessly using Replicate. Customize and fine-tune your photo generation to perfectly match your unique style or creative vision.",
    icon: <Package2 className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    title: "Customizable Photo Generation",
    description:
      "Tailor each image to reflect your personal or brand style. By creating your own AI model, you can effortlessly fine-tune poses, expressions, and even background settings for a perfect visual representation that fits your unique aesthetic.",
    icon: <Palette className="w-6 h-6" strokeWidth={1.5} />,
  },
];

const Features = () => {
  return (
    <section
      className="w-full bg-muted py-32 flex flex-col items-center justify-center"
      id="features"
    >
      <div className="container px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative bg-muted">
        <div className=" col-span-2 space-y-4">
          <Badge className="backdrop-blur-lg text-lg">Features</Badge>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold">
            Unlock Unlimited Possibilities with MindForge{" "}
          </h2>
          <p className="text-base text-muted-foreground lg:max-w-[75%]">
            Our platform offers a wide range of features designed to enhance
            your image creation experience. From easy-to-use editing tools to
            powerful -powered image generation, we have everything you need to
            bring your ideas to life.
          </p>
        </div>

        <div className="flex flex-col items-start justify-start order-2 lg:order-1">
          {featureList.map((feature) => {
            return (
              <div
                key={feature.title}
                className="flex items-start gap-4 rounded-lg p-12"
              >
                <span className="p-2 rounded-md  text-background bg-foreground">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="sm:text-2xl text-xl font-medium">{feature.title}</h3>
                  <p className="xs:text-base text-sm text-muted-foreground pt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            "h-fit sticky top-32 pl-16 pt-16 rounded-lg border-r-gray-500 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627FAB] via-[#B95480] to-[#627FAB] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2"
          )}
        >
          <Image
            src={dashboard}
            alt="image"
            className="w-full h-auto rounded-tl-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
