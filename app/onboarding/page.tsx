"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShoppingCart, Globe, BookOpen, ArrowRight } from "lucide-react";
import { motion, easeOut } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { changeUserRole } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BackgroundPattern } from "@/components/background-pattern";

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

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
      } else if (!user) {
        router.push("/signup");
      } else {
        setRedirecting(false);
      }
    }
  }, [loading, user, router]);

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
      icon: ShoppingCart,
      color: "violet",
    },
    {
      id: "preserver",
      title: "Preserve Budaya",
      description: "Lestarikan budaya dan karya tradisional agar tetap hidup.",
      icon: BookOpen,
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
    <div className="min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Animated background */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <BackgroundPattern />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-center mb-4"
            variants={fadeUp}
          >
            Tujuan utama kamu di platform ini?
          </motion.h1>

          <motion.p
            className="text-center text-foreground/80 md:text-lg mb-12 max-w-2xl"
            variants={fadeUp}
          >
            Pilih peran yang paling sesuai dengan tujuanmu di NavaLoka
          </motion.p>

          {/* Cards Grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-3 w-full mb-12"
            variants={containerVariants}
          >
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              return (
                <motion.div
                  key={plan.id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className="cursor-pointer"
                >
                  <Card
                    className={cn(
                      "h-full border-2 transition-all duration-300 relative overflow-hidden group",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border bg-card hover:border-primary/50 hover:shadow-lg"
                    )}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-3 w-3 rounded-full bg-primary-foreground"
                        />
                      </motion.div>
                    )}

                    <CardHeader className="flex flex-col p-6 space-y-4">
                      <motion.div
                        className={cn(
                          "h-14 w-14 flex items-center justify-center rounded-xl mb-2 transition-all duration-300",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground/70 group-hover:bg-primary/10"
                        )}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>

                      <div className="space-y-2">
                        <CardTitle className="text-xl font-semibold tracking-tight">
                          {plan.title}
                        </CardTitle>
                        <CardDescription className="text-foreground/70 text-[15px] leading-relaxed">
                          {plan.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fadeUp}>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="rounded-full text-base group px-8"
              disabled={!selectedPlan || loadingOnboarding}
            >
              {loadingOnboarding ? (
                "Memproses..."
              ) : (
                <>
                  Lanjut
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
