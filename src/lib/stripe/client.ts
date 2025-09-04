import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE.trim() !== ""
        ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE
        : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!key) {
      throw new Error("Stripe publishable key is missing. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env");
    }

    stripePromise = loadStripe(key);
  }

  return stripePromise;
};
