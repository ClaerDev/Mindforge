import AccountForm from "@/components/account-settings/account-form";
import SecuritySection from "@/components/account-settings/security-section";
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const AccountSettings = async () => {
  const supanase = await createClient();

  const user = await getUser(supanase);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="container mx-auto pl-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-8 mt-10 ">
        <AccountForm user={user} />
        <SecuritySection user={user}/>
      </div>
    </div>
  );
};

export default AccountSettings;
