"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse {
  error: null | string;
  success: boolean;
  data: unknown | null;
}

export async function signup(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const fullName = formData.get("fullName");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid email or password", success: false, data: null };
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/login`,
      data: {
        fullName: typeof fullName === "string" ? fullName : undefined,
      },
    },
  });

  return {
    error: error?.message || "There was an error signing up",
    success: !error,
    data: signUpData || null,
  };
}

export async function login(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid email or password", success: false, data: null };
  }

  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    error: error?.message || "There was an error logging in",
    success: !error,
    data: loginData || null,
  };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}
