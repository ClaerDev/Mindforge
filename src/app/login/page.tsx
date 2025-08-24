"use client";

import Image from "next/image";
import React from "react";
import AuthImage from "@/public/Abstract Curves and Colors.jpeg";
import Logo from "@/components/logo";
import AuthForm from "@/components/authentication/auth-form";

const AuthPage = () => {
  return (
    <main className="h-screen grid grid-cols-1 md:grid-cols-2 relative">
      <div className="hidden md:flex relative w-full flex-col bg-muted p-10 text-primary-foreground">
        <div className="w-full h-[30%] bg-gradient-to-t from-transparent to-black/70 absolute top-0 left-0 z-10" />
        <div className="w-full h-[40%] bg-gradient-to-b from-transparent to-black/70 absolute bottom-0 left-0 z-10" />

        <Image
          src={AuthImage}
          alt="image"
          fill
          priority
          className="w-full h-full object-cover"
        />

        <div className="relative z-20 flex items-center">
          <Logo />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-xl">
              &ldquo;Pictoria AI is a game changer for me. I have been able to
              generate high quality professional headshots within minutes. It
              has saved me countless hours of work and cost as well.&rdquo;
            </p>
            <footer className="text-lg">Paarthu Reddy</footer>
          </blockquote>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center p-6 md:p-8 h-full w-full">
        <div className="w-full max-w-sm sm:max-w-md md:w-[350px]">
          <AuthForm />
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
