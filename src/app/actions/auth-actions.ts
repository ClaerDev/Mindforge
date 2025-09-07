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
      data: {
        fullName: typeof fullName === "string" ? fullName : undefined,
      },
    },
  });

  if (signUpData?.user && !error) {
    await supabase.from("users").insert([
      {
        id: signUpData.user.id,
        full_name: typeof fullName === "string" ? fullName : null,
      },
    ]);

    await supabase.from("credits").insert([
      {
        user_id: signUpData.user.id,
        credits: 10,
      },
    ]);
  }
  return {
    error: error?.message || (error ? "There was an error signing up" : null),
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

export async function updateProfile(values: {
  fullName: string;
}): Promise<AuthResponse> {
  const supabase = await createClient();

  const { data: profileUpdatedData, error } = await supabase.auth.updateUser({
    data: { fullName: values.fullName },
  });

  return {
    error: error?.message || "There was an error updating profile",
    success: !error,
    data: profileUpdatedData || null,
  };
}

export async function resetPassword(values: {
  email: string;
}): Promise<AuthResponse> {
  const supabase = await createClient();

  const { data: resetPassword, error } =
    await supabase.auth.resetPasswordForEmail(values.email);

  return {
    error: error?.message || "There was an error resetting your password!",
    success: !error,
    data: resetPassword || null,
  };
}

export async function changePasword(
  newPassword: string
): Promise<AuthResponse> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return {
    error: error?.message || "There was an error resetting the password!",
    success: !error,
    data: data || null,
  };
}
