"use client"

import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";

const Pricing = () => {
  const [billingInterval, setBillingInterval] = useState("month");

  return (
    <section className="w-full bg-muted flex flex-col items-center justify-center">
      <div className="w-full container mx-auto py-32 flex flex-col items-center justify-center space-y-8 text-center">
        <div className="relative inline-flex">
          <span
            className={cn(
              "relative inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold tracking-wide overflow-hidden",
              "bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] text-white bg-[length:300%_100%]"
            )}
          >
            <AnimatedGradientText className="relative z-10 text-white font-semibold">
              Pricing
            </AnimatedGradientText>

            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
          Find the Right Plan for You
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground">
          Select from flexible and affordable plans designed to help you create,
          engage, and grow, whether you&apos;re just starting or scaling your
          vision.
        </p>


      <div className="flex justify-center items-center space-x-4 py-8">
        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Monthly
        </Label>

        <Switch
          id="pricing-switch"
          checked={billingInterval === "year"}
          onCheckedChange={(checked) =>
            setBillingInterval(checked ? "year" : "month")
          }
        />
        <Label htmlFor="pricing-switch" className="font-semibold text-base">
          Yearly
        </Label>
      </div>
      </div>

    </section>
  );
};

export default Pricing;
