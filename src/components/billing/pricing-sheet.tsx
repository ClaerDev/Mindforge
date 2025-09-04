import { Tables } from "@database.types";
import { User } from "@supabase/supabase-js";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Pricing from "./pricing-section";

type Product = Tables<"products">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;

// Database relationships
interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface PricingSheetProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PricingSheet = ({ user, products, subscription }: PricingSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="border-t border-border px-4 py-3 mt-3"
        >
          Upgrade
        </Button>
      </SheetTrigger>

      <SheetContent 
        className="w-full sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] text-left overflow-y-auto max-h-screen"
        side="right"
      >
        <SheetHeader className="pb-6">
          <SheetTitle className="text-xl font-bold">Change Subscription Plan</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Choose a plan that fits your needs and budget to continue using our service.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 pb-8">
          <Pricing
            user={user}
            products={products ?? []}
            subscription={subscription}
            mostPopularProd="pro"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PricingSheet;