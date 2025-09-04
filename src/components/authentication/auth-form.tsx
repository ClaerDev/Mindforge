"use client";

import React, { useState } from "react";
import LoginForm from "./login-form";
import SignUpForm from "./signup-form";
import ResetPasswordForm from "./reset-password-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

const AuthForm = ({ state }: { state: string }) => {
  const [mode, setMode] = useState(state);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {mode === "reset"
            ? "Reset Password"
            : mode === "login"
            ? "Login"
            : "Sign Up"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {mode === "reset"
            ? "Enter your email to receive password reset instructions."
            : mode === "login"
            ? "Sign in with your email to access your account."
            : "Fill in your details to create a new account."}
        </p>
      </div>

      {mode === "login" && (
        <>
          <LoginForm />
          <div className="flex justify-between text-center">
            <Button
              className="p-0"
              variant="link"
              onClick={() => setMode("signup")}
            >
              Need an account? Sign Up
            </Button>
            <Button
              className="p-0"
              variant="link"
              onClick={() => setMode("reset")}
            >
              Forgot Password?
            </Button>
          </div>
        </>
      )}

      {mode === "signup" && (
        <>
          <SignUpForm />

          <div className="flex items-start gap-2 px-2 md:px-8 text-sm text-muted-foreground">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(val) => setAgreed(!!val)}
              className="mt-0.5"
            />
            <label
              htmlFor="terms"
              className="leading-snug cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By signing up, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <div className="text-center">
            <Button
              className="p-0"
              variant="link"
              onClick={() => setMode("login")}
            >
              Already have an account? Login
            </Button>
          </div>
        </>
      )}

      {mode === "reset" && (
        <>
          <ResetPasswordForm />
          <div className=" text-center">
            <Button
              className="p-0"
              variant="link"
              onClick={() => setMode("login")}
            >
              Back to Login
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
