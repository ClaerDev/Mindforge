/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, Github } from "lucide-react";
import { RainbowButton } from "../magicui/rainbow-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Marquee } from "../magicui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

import img1 from "@/public/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg";
import img2 from "@/public/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg";
import img3 from "@/public/hero-images/Confident Woman in Red Outfit.jpeg";
import img4 from "@/public/hero-images/Confident Woman in Urban Setting.jpeg";
import img5 from "@/public/hero-images/Futuristic Helmet Portrait.jpeg";
import img6 from "@/public/hero-images/Futuristic Woman in Armor.jpeg";
import img7 from "@/public/hero-images/Man in Brown Suit.jpeg";
import img8 from "@/public/hero-images/Poised Elegance of a Young Professional.jpeg";
import img9 from "@/public/hero-images/Professional Business Portrait.jpeg";
import img10 from "@/public/hero-images/Professional Woman in Navy Blue Suit.jpeg";
import img11 from "@/public/hero-images/Sophisticated Businessman Portrait.jpeg";

const avatars = [
  { src: "/avatars/AutumnTechFocus.jpeg", fallback: "CN" },
  { src: "/avatars/Casual Creative Professional.jpeg", fallback: "AB" },
  { src: "/avatars/Golden Hour Contemplation.jpeg", fallback: "FG" },
  {
    src: "/avatars/Portrait of a Woman in Rust-Colored Top.jpeg",
    fallback: "PW",
  },
  { src: "/avatars/Radiant Comfort.jpeg", fallback: "RC" },
  {
    src: "/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg",
    fallback: "RB",
  },
];

const Images = [
  { src: img1, alt: "generated image" },
  { src: img2, alt: "generated image" },
  { src: img3, alt: "generated image" },
  { src: img4, alt: "generated image" },
  { src: img5, alt: "generated image" },
  { src: img6, alt: "generated image" },
  { src: img7, alt: "generated image" },
  { src: img8, alt: "generated image" },
  { src: img9, alt: "generated image" },
  { src: img10, alt: "generated image" },
  { src: img11, alt: "generated image" },
];

const MarqueeColumn = ({
  reverse,
  duration,
  className,
}: {
  reverse: boolean;
  duration: string;
  className?: string;
}) => {
  return (
    <Marquee
      reverse={reverse}
      pauseOnHover
      vertical
      className={cn("relative h-full w-full flex flex-col", className)}
      style={{ ["--duration" as any]: duration } as React.CSSProperties}
    >
      {Images.sort(() => Math.random() - 0.5).map((image, index) => (
        <div key={index} className="h-40 w-full flex-shrink-0">
          <Image
            src={image.src}
            alt={image.alt}
            priority
            className="h-full w-full object-cover rounded-lg opacity-40 hover:opacity-100 transition-opacity duration-300 ease-in-out"
          />
        </div>
      ))}
    </Marquee>
  );
};

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 z-0 grid xl:grid-cols-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 pointer-events-none opacity-30 overflow-hidden hover:opacity-100">
        <MarqueeColumn reverse={false} duration="60s" />
        <MarqueeColumn reverse={true} duration="90s" />
        <MarqueeColumn reverse={false} duration="75s" />
        <MarqueeColumn reverse={true} duration="100s" className=" hidden md:flex" />
        <MarqueeColumn reverse={false} duration="80s" className=" hidden lg:flex" />
        <MarqueeColumn reverse={true} duration="120s" className=" hidden lg:flex" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 py-20">
        <RainbowButton asChild>
          <a
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 inline-flex items-center gap-2 px-6 py-3 text-base font-semibold hover:scale-105 transition-transform"
          >
            <Github className="w-5 h-5" />
            Star on GitHub
          </a>
        </RainbowButton>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-clip-text text-transparent max-w-4xl mx-auto">
          Train your own AI model. Generate images that are truly yours.
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground">
          Elevate everything from LinkedIn headshots to social content.
          MindForge&apos;s advanced AI delivers polished, high-quality images
          created, edited, and enhanced in seconds.
        </p>

        <div className="flex items-center space-x-2 mb-4 mt-3">
          <div className="flex items-center -space-x-5 sm:-space-x-4 overflow-hidden">
            {avatars.map((avatar, index) => (
              <Avatar
                key={index}
                className="inline-block border-2 border-background"
              >
                <AvatarImage
                  src={avatar.src}
                  alt={avatar.fallback}
                  className="h-full object-cover"
                />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm font-medium">Loved by 1k+ customers</span>
        </div>

        <Button asChild className="rounded-md text-base h-12 mt-2">
          <Link href="/login?state=signup">
            Create Your First AI Model <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
