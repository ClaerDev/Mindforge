"use client";

import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { Tables } from "@database.types";
import Link from "next/link";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";

type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PricingProps {
  products: ProductWithPrices[];
  mostPopularProd?: string;
}

const Pricing = ({ products, mostPopularProd = "pro" }: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");

  return (
    <section className="w-full bg-muted flex flex-col items-center justify-center">
      <div className="w-full container mx-auto py-24 md:py-32 flex flex-col items-center justify-center space-y-8 text-center px-6">
        {/* Gradient Header */}
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

        {/* Title + Subtitle */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
          Find the Right Plan for You
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Select from flexible and affordable plans designed to help you create,
          engage, and grow, whether you&apos;re just starting or scaling your
          vision.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center space-x-4 py-6">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-8xl">
          {products.map((product) => {
            const price = product?.prices.find(
              (price) => price.interval === billingInterval
            );

            if (!price) return null;

            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);

            const isPopular =
              product.name?.toLowerCase() === mostPopularProd.toLowerCase();

            return (
              <div
                key={product.id}
                className={cn(
                  "flex flex-col rounded-2xl border bg-background shadow-md hover:shadow-xl transition-all duration-300",
                  isPopular
                    ? "border-primary scale-105 shadow-lg "
                    : "border-border"
                )}
              >
                <div className="p-8 flex flex-col h-full text-left">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">
                      {product.name}
                    </h2>
                    {isPopular && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-primary shadow-sm">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-6">
                    <span className="text-4xl font-extrabold text-foreground">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-muted-foreground">
                      /{billingInterval}
                    </span>
                  </div>

                  <div className="mt-8">
                    <Link href="/login?state=signup">
                      <Button
                        variant={isPopular ? "default" : "secondary"}
                        className="w-full py-3 px-4 rounded-xl font-semibold transition"
                      >
                        Subscribe
                      </Button>
                    </Link>
                  </div>

                  <div className="pt-6 pb-8 px-1 flex-1">
                    <h3 className="uppercase tracking-wide text-foreground font-medium text-sm">
                      What&apos;s included
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {Object.values(product.metadata || {}).map(
                        (feature, index) =>
                          feature && (
                            <li
                              className="flex items-center space-x-3"
                              key={index}
                            >
                              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-green-100 text-green-700 shadow-sm">
                                <CheckIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
