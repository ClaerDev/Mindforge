import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LoaderPinwheel } from "lucide-react";
import { NavUser } from "./nav-user";

// Add interface for subscription data
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  subscription?: {
    prices?: {
      products?: {
        name?: string;
      } | null;
    } | null;
  } | null;
}

export async function AppSidebar({
  ...props
}: AppSidebarProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = {
    name: data?.user?.user_metadata.fullName,
    email: data?.user?.email ?? "",
  };


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
  <Link href="/" passHref>
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <LoaderPinwheel className="size-5" />
      </div>
      <div className="grid flex-1 text-left text-2xl leading-tight">
        <span className="truncate font-bold">MindForge</span>
      </div>
    </SidebarMenuButton>
  </Link>
</SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />{" "}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}