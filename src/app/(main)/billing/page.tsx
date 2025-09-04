import SummaryPlan from "@/components/billing/summary-plan";
import { getProducts, getSubscription, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const Billing = async () => {
  const supabase = await createClient();

  const [user, products, subscription] = await Promise.all([
    // Perofmrance optimizee
    getUser(supabase), //Note:get the currently auth users
    getProducts(supabase), //get current actve produdcts
    getSubscription(supabase),
  ]);

  if (!user) {
    return redirect("/login");
  }

  return (
    <section className="container mx-auto pl-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Plans & Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscriptions and billing information
        </p>
      </div>

      <div className="grid gap-10">
        <SummaryPlan
          subscription={subscription}
          user={user}
          products={products || []}
        />
      </div>
    </section>
  );
};

export default Billing;
