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
import { SparklesIcon } from "lucide-react";
import { NavUser } from "./nav-user";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = {
    name: data?.user?.user_metadata.fullName,
    email: data?.user?.email ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <SparklesIcon className="size-4" />
          </div>
          <Link href={"/"}>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold">Pictoria AI</span>
              <span className="truncate text-xs">Pro</span>
            </div>
          </Link>
        </SidebarMenuButton>{" "}
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
