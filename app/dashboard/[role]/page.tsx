"use client";

import { use } from "react";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = use(params);

  return <div>My Post: {role}</div>;
}
