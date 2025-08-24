"use client"

import { logout } from "@/app/actions/auth-actions";
import React from "react";

const LogoutButton = () => {
  const handlelgout = async () => {
    await logout();
  };
  return (
    <span
      onClick={handlelgout}
      className="inline-block w-full cursor-pointer text-destructive"
    >
      Logout
    </span>
  );
};

export default LogoutButton;
