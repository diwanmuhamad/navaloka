"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignupForm } from "@/components/signup-form";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [redirecting, setRedirecting] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard");
      } else {
        setRedirecting(false);
      }
    }
  }, [loading, user]);

  if (loading || redirecting) {
    return null;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            NavaLoka
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Gambar"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
