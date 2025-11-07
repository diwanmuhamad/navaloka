"use client";

import { useEffect } from "react";
import { RootState, store } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

export function RoleProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !loading &&
      user &&
      !user.user_metadata.role &&
      pathname !== "/onboarding"
    ) {
      router.push("/onboarding");
    }
  }, [loading, user, router]);

  return <>{children}</>;
}
