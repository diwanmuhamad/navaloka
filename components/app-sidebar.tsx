"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  type Icon,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

interface NavItem {
  title: string;
  url: string;
  icon: Icon; // or React.ElementType if you prefer
}

const navMainUser: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/user",
    icon: IconDashboard,
  },
  {
    title: "My Collections",
    url: "/dashboard/user/my-collections",
    icon: IconListDetails,
  },
];

const navMainSeller: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/seller",
    icon: IconDashboard,
  },
  {
    title: "My Items",
    url: "/dashboard/seller/my-items",
    icon: IconListDetails,
  },
];

const navMainPreserver: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/preserver",
    icon: IconDashboard,
  },
  {
    title: "My Items",
    url: "/dashboard/preserver/my-items",
    icon: IconListDetails,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    avatar: string;
  }>({ name: "", email: "", avatar: "" });
  const [menu, setMenu] = useState<NavItem[]>([]);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.user_metadata.name,
        email: user.email || "",
        avatar: "",
      });

      const role = user.user_metadata.role;
      if (role === "user") setMenu(navMainUser);
      if (role === "seller") setMenu(navMainSeller);
      if (role === "preserver") setMenu(navMainPreserver);
    }
  }, [user]);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Navaloka</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
