import {  Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href={"/"} className="flex items-center gap-2">
        <Sparkles className="size-8" strokeWidth={1.5} />
        <span className="text-lg font-semibold">Visionary AI </span>
      </Link>
    </div>
  );
};

export default Logo;
