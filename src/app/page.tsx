import Features from "@/components/landing-page/features-section";
import HeroSection from "@/components/landing-page/hero-section";
import Navigation from "@/components/landing-page/navigation";
import Pricing from "@/components/landing-page/pricing-section";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const suapabse = await createClient();

  const [user, products] = await Promise.all([
    // Perofmrance optimizee
    getUser(suapabse), //Note:get the currently auth users
    getProducts(suapabse), //get current actve produdcts
  ]);

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigation />
      <HeroSection />
      <Features/>
      <Pricing products={products ?? []} />
    </main>
  );
}
