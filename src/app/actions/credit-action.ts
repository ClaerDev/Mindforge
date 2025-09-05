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
