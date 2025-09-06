import Faqs from "@/components/landing-page/faq-section";
import Features from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero-section";
import Navigation from "@/components/landing-page/navigation";
import Pricing from "@/components/landing-page/pricing-section";
import Testimonials from "@/components/landing-page/testim-section";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
      <Features />
      <Testimonials />
      <Pricing products={products ?? []} />
      <Faqs />

      <section className="w-full py-24 bg-muted-foreground/20 text-black">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <SparklesText className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Bring Your Photos to Life with AI
          </SparklesText>
          <p className="mt-4 text-lg sm:text-xl text-black">
            Train your own AI model and create stunning, personalized images in
            minutes. Join thousands of creators already transforming their
            photos.
          </p>
          <Button
            asChild
            className="mt-8 inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 h-14 px-6 rounded-lg text-base font-semibold transition-all"
          >
            <Link href="/login?state=signup">
              Start Creating <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer/>
    </main>
  );
}
