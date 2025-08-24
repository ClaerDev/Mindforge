"use client";

import {
  LayoutDashboard,
  ImageIcon,
  Frame,
  Layers,
  CreditCard,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Generate Image",
    url: "/image-generation",
    icon: ImageIcon,
  },
  {
    title: "My Models",
    url: "/models",
    icon: Frame,
  },

  {
    title: "Train Model",
    url: "/model-training",
    icon: Layers,
  },

  {
    title: "My Images",
    url: "/gallery",
    icon: ImageIcon,
  },

  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
  {
    title: "Setting",
    url: "/account-settings",
    icon: Settings2,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url} className="w-full">
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md hover:bg-primary/90 hover:text-white"
                      : "text-foreground hover:bg-gray-200 hover:text-foreground"
                  }`}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span className="text-sm font-medium">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
