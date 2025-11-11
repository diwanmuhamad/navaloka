"use client";

import { use } from "react";
import UserDashboardComponents from "@/components/user-dashboard/UserDashboardComponents";
import SellerDashboardComponents from "@/components/seller-dashboard/SellerDashboardComponents";
import PreserverDashboardComponents from "@/components/preserver-dashboard/PreserverDashboardComponents";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = use(params);

  if (role === "user") return <UserDashboardComponents />;
  if (role === "seller") return <SellerDashboardComponents />;
  if (role === "preserver") return <PreserverDashboardComponents />;
}
