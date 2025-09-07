"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@database.types";

interface CreditRes {
  error: null | string;
  success: boolean;
  data: Tables<"credits"> | null;
}

export async function getCredits(): Promise<CreditRes> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: creditsData, error } = await supabase
    .from("credits")

    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (error) {
    return {
      error: error?.message || null,
      success: false,
      data: null,
    };
  }

  return {
    error: null,
    success: true,
    data: creditsData,
  };
}

export async function deductCredits(amount: number): Promise<CreditRes> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not logged in", success: false, data: null };
  }

  const { data, error } = await supabase
    .from("credits")
    .update({ image_generation_count: supabase.rpc("greatest", ["image_generation_count - " + amount, 0]) }) // fallback for >=0
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { error: error.message, success: false, data: null };
  }

  return { error: null, success: true, data };
}

