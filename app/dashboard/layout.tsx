"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (error) return;

    if (!loading) {
      if (!user) {
        router.replace("/");
        return;
      }

      const role = user?.user_metadata?.role;
      if (!role) {
        router.replace("/onboarding");
        return;
      }

      const expectedPath = `/dashboard/${role}`;
      if (!pathname.startsWith(expectedPath)) {
        router.replace(expectedPath);
        return;
      }

      setRedirecting(false);
    }
  }, [loading, user, error, pathname, router]);

  if (loading || redirecting) {
    return <></>;
  }

  return <>{children}</>;
}
