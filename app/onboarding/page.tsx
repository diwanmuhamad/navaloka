"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Briefcase, Globe, Factory } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { changeUserRole } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loadingOnboarding, setLoadingOnboarding] = useState(false);
  const [redirecting, setRedirecting] = useState(true);
  useEffect(() => {
    if (!loading) {
      if (user?.user_metadata.role) {
        router.push("/dashboard");
      } else {
        setRedirecting(false);
      }
    }
  }, [loading, user]);

  if (loading || redirecting) {
    return null;
  }
  const plans = [
    {
      id: "user",
      title: "Cari / Beli Karya",
      description:
        "Eksplorasi karya-karya yang tersedia dan pilih sesuai kebutuhanmu.",
      icon: Globe,
      color: "violet",
    },
    {
      id: "seller",
      title: "Jual Karya",
      description:
        "Jual karya kreatifmu dan perkenalkan ke audiens yang tepat.",
      icon: Briefcase,
      color: "violet",
    },
    {
      id: "preserver",
      title: "Preserve Budaya",
      description: "Lestarikan budaya dan karya tradisional agar tetap hidup.",
      icon: Factory,
      color: "violet",
    },
  ];

  const handleSubmit = async () => {
    if (!selectedPlan) return;
    setLoadingOnboarding(true);

    try {
      await dispatch(changeUserRole({ newRole: selectedPlan }));
      toast.success("Selamat onboarding anda telah selesai");
      router.push("/dashboard");
    } catch (error: any) {
      const message =
        error?.message ||
        (typeof error === "string" ? error : "Terjadi kesalahan saat login");
      toast.error(message);
    }

    setLoadingOnboarding(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        Tujuan utama kamu di platform ini?
      </h1>

      <div className="grid gap-6 md:grid-cols-3 w-full max-w-5xl">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <Card
                className={cn(
                  "cursor-pointer border-2 transition-all duration-300",
                  selectedPlan === plan.id
                    ? `border-violet-500 bg-violet-50 shadow-lg`
                    : "border-gray-300 bg-white hover:shadow-md"
                )}
              >
                <CardHeader className="flex items-center space-x-4 p-6">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        selectedPlan === plan.id
                          ? "text-violet-600"
                          : "text-gray-500"
                      )}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
                      {plan.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div whileHover={{ scale: 1.02 }} className="mt-12">
        <Button
          onClick={handleSubmit}
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 text-lg font-medium transition-colors duration-200"
          disabled={!selectedPlan || loadingOnboarding}
        >
          Lanjut
        </Button>
      </motion.div>
    </div>
  );
}
