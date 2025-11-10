"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store/store";

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const role = user.user_metadata.role;
      router.replace(`/dashboard/${role}`);
    } else {
      router.replace("/");
    }
  }, [user, router]);

  return <></>;
}
