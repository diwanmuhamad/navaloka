"use client";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { BackgroundPattern } from "@/components/background-pattern";
import SplitText from "./SplitText";
import LiquidChrome from "./LiquidChrome";

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

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle moving background */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <LiquidChrome
          baseColor={[0.7, 0.7, 0.9]}
          speed={0.3}
          amplitude={0.3}
          interactive={true}
        />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <SplitText
          text="Budaya. Kreativitas. Teknologi."
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter p-3"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
        />

        <motion.p
          className="mt-6 md:text-lg text-foreground/80"
          variants={fadeUp}
        >
          Satu platform untuk masa depan budaya Indonesia — menghadirkan
          ekosistem budaya yang autentik, transparan, dan berkelanjutan dengan
          AI & Blockchain.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          variants={fadeUp}
        >
          <Button size="lg" className="rounded-full text-base group">
            Mulai Sekarang{" "}
            <ArrowUpRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none group"
          >
            <CirclePlay className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
            Lihat Demo
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
