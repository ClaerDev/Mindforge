/* eslint-disable @next/next/no-img-element */
import { SparklesText } from "../magicui/sparkles-text";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Aarav",
    username: "@aarav",
    body: "MindForge has completely changed how I create visuals. Generating high-quality AI images is so fast and easy now.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Isha",
    username: "@isha",
    body: "I trained my own AI model in just a few minutes. MindForge makes the whole process surprisingly simple!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Rohan",
    username: "@rohan",
    body: "The image quality is incredible. I love that I can tweak my models and get exactly the results I want.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Priya",
    username: "@priya",
    body: "From generating social media graphics to training personalized models, MindForge is a total game-changer.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Ananya",
    username: "@ananya",
    body: "I’ve tried other AI image tools, but MindForge’s combination of speed, customization, and quality is unmatched.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Vikram",
    username: "@vikram",
    body: "MindForge allowed me to create my own AI models without any technical headache. Highly recommended for creators!",
    img: "https://avatar.vercel.sh/james",
  },
];



const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const Testimonials = () => {
  return (
    <section
      className="w-full bg-muted py-32 flex flex-col items-center justify-center overflow-hidden"
      id="testimonials"
    >
      <SparklesText className="text-2xl xs:text-3xl sm:text-4xl font-bold">
        What Our Users Say{" "}
      </SparklesText>
      <p className="mt-4 text-base text-center max-w-2xl text-muted-foreground">
        Discover why thousands are choosing MindForge for effortless,
        high-quality photo generation. From LinkedIn headshots to vibrant social
        media content, our users love the simplicity and results.
      </p>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-14">
        <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem] sm:[--gap-2rem]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:1rem] sm:[--gap-2rem] mt-1">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
};

export default Testimonials;
