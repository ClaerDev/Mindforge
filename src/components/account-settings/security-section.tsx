"use client"

import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useId } from "react";
import { toast } from "sonner";
import { resetPassword } from "@/app/actions/auth-actions";

interface SecurityProps {
  user: User;
}

const SecuritySection = ({ user }: SecurityProps) => {
  const toastId = useId();

  async function handleChangePass() {
    toast.loading("Sending reset password email...", { id: toastId });
    try {
      const { success, error } = await resetPassword({
        email: user?.email || "",
      });
      if (!success) {
        toast.error(error, { id: toastId });
      } else {
        toast.success(
          "Password reset email send! Please check your email for instructions!",
          { id: toastId }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.message || "There is an error sending password reset email!!",
        {
          id: toastId,
        }
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password to keep your account secure
          </p>
          <Button variant={"outline"} onClick={handleChangePass}>
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
