/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { Tables } from "@database.types";

import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { checkoutWithStripe, createStripePortal } from "@/lib/stripe/server";
import { getErrorRedirect } from "@/lib/helper";
import { getStripe } from "@/lib/stripe/client";
import { toast } from "sonner";
type Product = Tables<"products">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface PricingProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
  mostPopularProd?: string;
  showInterval?: boolean;
  className?: string;
  activeProduct?: string;
}

const renderPricingButton = ({
  subscription,
  user,
  product,
  price,
  mostPopularProd,
  handleStripeCheckout,
  handleStripePortalRequest,
}: {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  product: ProductWithPrices;
  price: Price;
  mostPopularProd: string;
  handleStripeCheckout: (price: Price) => Promise<void>;
  handleStripePortalRequest: () => Promise<void>;
}) => {
  // Case1:User has active subscription of this account for this product
  if (
    user &&
    subscription &&
    subscription?.prices?.products?.name?.toLowerCase() ===
      product?.name?.toLowerCase()
  ) {
    // user has already subscribed to this plan!
    return (
      <Button
        className="mt-8 w-full font-semibold"
        onClick={handleStripePortalRequest}
      >
        Manage Subscription
      </Button>
    );
  }

  // Case2: If logged in and has a active subscriotion for diff product
  if (user && subscription) {
    return (
      <Button
        className="mt-8 w-full font-semibold text-black"
        variant={"secondary"}
        onClick={handleStripePortalRequest}
      >
        Switch Plan
      </Button>
    );
  }

  // Logged in user with no subscription plan
  if (user && !subscription) {
    return (
      <Button
        variant={
          product.name?.toLowerCase() === mostPopularProd.toLowerCase()
            ? "default"
            : "secondary"
        }
        className="mt-8 w-full font-semibold"
        onClick={() => handleStripeCheckout(price)}
      >
        Subscribe
      </Button>
    );
  }
  return (
    <Button
      variant={
        product.name?.toLowerCase() === mostPopularProd.toLowerCase()
          ? "default"
          : "secondary"
      }
      className="mt-8 w-full font-semibold"
      onClick={() => handleStripeCheckout(price)}
    >
      Subscribe
    </Button>
  );
};

const Pricing = ({
  subscription,
  user,
  products,
  mostPopularProd = "",
  showInterval = true,
  className,
  activeProduct = "",
}: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");

  const router = useRouter();
  const currentPaht = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    // console.log("HNDLE stripe checkoput funtion: ", price);

    if (!user) {
      return router.push("/login");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPaht
    );
    if (errorRedirect) {
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      return router.push(
        getErrorRedirect(
          currentPaht,
          "An unknown error",
          "Please try again later or contact us."
        )
      );
    }

    const stripe = await getStripe();
    // move to the stripcheckut page
    stripe?.redirectToCheckout({ sessionId });

    return "Stripe Checkput Funtion";
  };

  const handleStripePortalRequest = async () => {
    toast.info("Redirecting to stripe portal...");
    const redirectUrl = await createStripePortal(currentPaht);
    return router.push(redirectUrl);
  };

  return (
    <section className={cn("w-full", className)}>
      {showInterval && (
        <div className="flex justify-center items-center space-x-4 mb-8">
          <Label htmlFor="pricing-switch" className="font-semibold text-sm">
            Monthly
          </Label>
          <Switch
            id="pricing-switch"
            checked={billingInterval === "year"}
            onCheckedChange={(checked) =>
              setBillingInterval(checked ? "year" : "month")
            }
          />
          <Label htmlFor="pricing-switch" className="font-semibold text-sm">
            Yearly
          </Label>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 space-y-0 gap-4 sm:gap-6 w-full mx-auto">
        {(products ?? []).map((product) => {
          const price = product?.prices?.find(
            (price) => price.interval === billingInterval
          );
          if (!price) return null;

          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);

          const isPopular =
            product.name?.toLowerCase() === activeProduct.toLowerCase();

          return (
            <div
              key={product.id}
              className={cn(
                "flex flex-col justify-between rounded-xl border bg-background shadow-md hover:shadow-lg transition-all duration-300 p-6 text-left h-full",
                "min-w-[240px] max-w-[320px] mx-auto w-full",
                isPopular
                  ? "border-primary ring-2 ring-primary/20 relative"
                  : "border-border"
              )}
            >
              {product.name?.toLowerCase() === activeProduct.toLowerCase() && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-primary shadow-md">
                    Selected
                  </span>
                </div>
              )}
              {product.name?.toLowerCase() ===
                mostPopularProd.toLowerCase() && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-primary shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex-grow">
                <div className="flex items-center justify-center">
                  <h2 className="text-xl font-bold text-foreground text-center">
                    {product.name}
                  </h2>
                </div>

                <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-center">
                  {product.description}
                </p>

                <div className="mt-6 text-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    {priceString}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    /{billingInterval}
                  </span>
                </div>
              </div>
              {renderPricingButton({
                subscription,
                user,
                product,
                price,
                mostPopularProd,
                handleStripeCheckout,
                handleStripePortalRequest,
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
