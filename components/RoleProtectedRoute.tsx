"use client";

import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
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
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User has role → safe to render
        if (user.user_metadata.role) {
          setRedirecting(false);
        } else {
          // No role → if not on /onboarding, redirect
          if (pathname !== "/onboarding") {
            router.push("/onboarding");
          } else {
            setRedirecting(false); // on onboarding page → render
          }
        }
      } else {
        setRedirecting(false);
      }
    }
  }, [loading, user, router, pathname]);

  if (redirecting) return null; // wait until redirect / ready

  return <>{children}</>;
}
