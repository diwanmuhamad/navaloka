"use client";
import { motion } from "framer-motion";
import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from "lucide-react";

const features = [
  {
    icon: Settings2,
    title: "Tata Letak yang Dapat Disesuaikan",
    description:
      "Desain ruang Anda dengan kesederhanaan drag-and-drop—buat grid, daftar, atau galeri dalam hitungan detik.",
  },
  {
    icon: Blocks,
    title: "Widget Interaktif",
    description:
      "Sematkan polling, kuis, atau formulir untuk menjaga audiens tetap terlibat.",
  },
  {
    icon: Bot,
    title: "Alat Berbasis AI",
    description:
      "Buat ringkasan, format konten otomatis, atau terjemahkan ke berbagai bahasa dengan mulus.",
  },
  {
    icon: Film,
    title: "Integrasi Media",
    description:
      "Terhubung dengan Spotify, Instagram, atau perpustakaan media Anda sendiri untuk visual dan suara yang dinamis.",
  },
  {
    icon: ChartPie,
    title: "Analitik Lanjutan",
    description:
      "Lacak keterlibatan, klik, dan aktivitas pengguna dengan bagan dan laporan yang intuitif.",
  },
  {
    icon: MessageCircle,
    title: "Kolaborasi Tanpa Hambatan",
    description:
      "Komentar, tag, dan tetapkan tugas langsung di dalam dokumen Anda.",
  },
];

// animation variants for container + cards
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
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

const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center">
          Lepaskan Kreativitas Anda
        </h2>

        {/* Animated grid */}
        <motion.div
          className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-(--breakpoint-lg) mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="flex flex-col border rounded-xl py-6 px-5 hover:shadow-lg transition-shadow"
            >
              <motion.div
                className="mb-4 h-10 w-10 flex items-center justify-center bg-muted rounded-full"
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="size-5" />
              </motion.div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
