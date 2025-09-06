"use client";

import { User } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useId } from "react";
import { toast } from "sonner";
import { updateProfile } from "@/app/actions/auth-actions";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
});

interface AccoutnFormProps {
  user: User;
}

const AccountForm = ({ user }: AccoutnFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.user_metadata?.fullName || "",
      email: user?.email || "",
    },
  });
  const toastId = useId();

  //   console.log(user)

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Updating the profile...", { id: toastId });
    try {
      const { success, error } = await updateProfile(values);
      if (!success) {
        toast.error(error, { id: toastId });
      } else {
        toast.success("Profile Updated Successfully!", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "There is an error updating the profile", {
        id: toastId,
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" className="bg-blue-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    Your email address is used for signing in and communication.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountForm;
