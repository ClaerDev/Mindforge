import { Tables } from "@database.types";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import PricingSheet from "./pricing-sheet";
import { format } from "date-fns";
import { Calendar, DollarSign, Ticket } from "lucide-react";

type Product = Tables<"products">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;

//IDEA: WE USE EXTEND BECAUSE IN THE DATABASE THE TABLES ARE MIXED THATS WHY!!
interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface PlanSummaryProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const SummaryPlan = ({ subscription, user, products }: PlanSummaryProps) => {
  if (!subscription || subscription?.status !== "active") {
    return (
      <Card className="max-w-5xl mt-6 shadow-2xl rounded-lg">
        <CardContent className="px-5 py-4">
          <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
            <span>Plan Summary</span>
            <Badge variant={"secondary"} className="bg-primary/10">
              No Plan
            </Badge>
          </h3>

          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-5 flex flex-col pr-12">
              <div className="flex-1 text-sm font-normal flex w-full justify-between pb-1">
                <span className="font-normal text-muted-foreground ml-1 lowercase">
                  Image generation credits left
                </span>
                <span className="font-medium">0 remaining</span>{" "}
              </div>

              <div className="mb-1 flex items-end">
                <Progress value={0} className="w-full h-2" />
              </div>
            </div>

            <div className="col-span-5 flex flex-col pr-12">
              <div className="flex-1 text-sm font-normal flex w-full justify-between pb-1">
                <span className="font-normal text-muted-foreground ml-1 lowercase">
                  Model training credits left
                </span>
                <span className="font-medium">0 remaining</span>{" "}
              </div>

              <div className="mb-1 flex items-end">
                <Progress value={0} className="w-full h-2" />
              </div>
            </div>
            <div className="col-span-full flex flex-col ">
              Please upgrade to a plan to continue using the app
            </div>
          </div>
        </CardContent>
        <hr />
        <CardFooter className="bg-muted/90">
          <span className="flex ml-auto flex-row">
            <PricingSheet
              user={user}
              products={products ?? []}
              subscription={subscription}
            />
          </span>
        </CardFooter>
      </Card>
    );
  }

  console.log(subscription);

  const {
    products: subscriptionProduct,
    unit_amount,
    currency,
  } = subscription?.prices;

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency!,
    minimumFractionDigits: 0,
  }).format((unit_amount || 0) / 100);

  return (
    <div>
      <Card className="max-w-5xl mt-6 shadow-2xl rounded-lg">
        <CardContent className="px-5 py-4">
          <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
            <span>Plan Summary</span>
            <Badge variant={"secondary"} className="bg-primary/10">
              {subscriptionProduct?.name} Plan
            </Badge>
          </h3>

          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-5 flex flex-col pr-12">
              <div className="flex-1 text-sm font-normal flex w-full justify-between pb-1">
                <span className="font-normal text-muted-foreground ml-1 lowercase">
                  Image generation credits left
                </span>
                <span className="font-medium">0 remaining</span>{" "}
              </div>

              <div className="mb-1 flex items-end">
                <Progress value={0} className="w-full h-2" />
              </div>
            </div>

            <div className="col-span-5 flex flex-col pr-12">
              <div className="flex-1 text-sm font-normal flex w-full justify-between pb-1">
                <span className="font-normal text-muted-foreground ml-1 lowercase">
                  Model training credits left
                </span>
                <span className="font-medium">0 remaining</span>{" "}
              </div>

              <div className="mb-1 flex items-end">
                <Progress value={0} className="w-full h-2" />
              </div>
            </div>

            <div className="col-span-3 flex flex-row justify-between flex-wrap ">
              {" "}
              <div className="flex flex-col pb-0">
                {" "}
                <div className="text-sm font-normal">Price/month</div>{" "}
                <div className="flex-1 pt-1 tetx-sm font-medium">
                  {" "}
                  {priceString}{" "}
                </div>{" "}
              </div>{" "}
              <div className="flex flex-col pb-0">
                {" "}
                <div className="text-sm font-normal">Included Credits</div>{" "}
                <div className="flex-1 pt-1 tetx-sm font-medium">0 credits</div>{" "}
              </div>{" "}
              <div className="flex flex-col pb-0">
                {" "}
                <div className="text-sm font-normal">Renewal Date</div>{" "}
                <div className="flex-1 pt-1 tetx-sm font-medium">
                  {" "}
                  {format(
                    new Date(subscription.current_period_end),
                    "MMM d, yyyy"
                  )}{" "}
                </div>{" "}
              </div>{" "}
            </div>
          </div>
        </CardContent>
        <hr />
      </Card>
    </div>
  );
};

export default SummaryPlan;
