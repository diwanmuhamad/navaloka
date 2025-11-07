"use client";

import { useEffect, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { BackgroundPattern } from "@/components/background-pattern";
import { ShoppingCart, MessageCircle, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

interface Karya {
  id: string;
  title: string;
  category: string;
  medium: string;
  dimensions: string;
  price: number;
  image_url?: string;
  artist_name?: string;
  description?: string;
}

export default function MarketplacePage() {
  const [karyaList, setKaryaList] = useState<Karya[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchKarya();
  }, []);

  const fetchKarya = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('karya')
      //   .select('*')
      //   .eq('is_published', true)
      //   .order('created_at', { ascending: false });

      // Mock data for now - replace with actual data from Supabase
      const mockKarya: Karya[] = [
        {
          id: "1",
          title: "Wayang Kulit Modern",
          category: "2D",
          medium: "Kulit Sapi, Cat Akrilik",
          dimensions: "30\" x 24\"",
          price: 2500000,
          artist_name: "Budi Santoso",
          description: "Karya wayang kulit kontemporer dengan sentuhan modern",
        },
        {
          id: "2",
          title: "Batik Tulis Nusantara",
          category: "2D",
          medium: "Kain Katun, Lilin, Pewarna Alami",
          dimensions: "200cm x 110cm",
          price: 3500000,
          artist_name: "Siti Nurhaliza",
          description: "Batik tulis tradisional dengan motif nusantara",
        },
        {
          id: "3",
          title: "Patung Garuda Emas",
          category: "3D",
          medium: "Kuningan, Emas 24K",
          dimensions: "50cm x 40cm x 30cm",
          price: 15000000,
          artist_name: "Ahmad Wijaya",
          description: "Patung garuda dengan detail ukiran tradisional",
        },
        {
          id: "4",
          title: "Lukisan Pemandangan Bali",
          category: "2D",
          medium: "Cat Minyak di Kanvas",
          dimensions: "60\" x 40\"",
          price: 4500000,
          artist_name: "Ketut Surya",
          description: "Lukisan pemandangan sawah terasering di Bali",
        },
        {
          id: "5",
          title: "Keramik Gaya Majapahit",
          category: "3D",
          medium: "Tanah Liat, Glaze",
          dimensions: "25cm x 25cm x 20cm",
          price: 1200000,
          artist_name: "Dewi Lestari",
          description: "Keramik dengan motif dan bentuk gaya Majapahit",
        },
        {
          id: "6",
          title: "Tenun Ikat Sumba",
          category: "2D",
          medium: "Benang Katun, Pewarna Alami",
          dimensions: "250cm x 120cm",
          price: 2800000,
          artist_name: "Maria Wunga",
          description: "Tenun ikat tradisional Sumba dengan motif kuda",
        },
        {
          id: "7",
          title: "Topeng Malangan",
          category: "3D",
          medium: "Kayu Jati, Cat Akrilik",
          dimensions: "30cm x 25cm x 15cm",
          price: 850000,
          artist_name: "Joko Prasetyo",
          description: "Topeng tradisional Malang dengan karakter wayang",
        },
        {
          id: "8",
          title: "Kaligrafi Arab-Jawa",
          category: "2D",
          medium: "Kertas Khusus, Tinta Emas",
          dimensions: "50cm x 70cm",
          price: 3200000,
          artist_name: "Ahmad Fauzi",
          description: "Kaligrafi dengan gaya Arab-Jawa yang unik",
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setKaryaList(mockKarya);
    } catch (error) {
      console.error("Error fetching karya:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const categories = ["All", "2D", "3D"];
  const categoryStyles: Record<string, string> = {
    "2D": "text-rose-700 bg-rose-100/70 dark:text-rose-300 dark:bg-rose-500/10",
    "3D": "text-sky-700 bg-sky-100/70 dark:text-sky-300 dark:bg-sky-500/10",
  };
  const filteredKarya =
    selectedCategory === "All" || !selectedCategory
      ? karyaList
      : karyaList.filter((k) => k.category === selectedCategory);

  const handleBuy = (karya: Karya) => {
    // TODO: Implement buy functionality
    console.log("Buying:", karya);
  };

  const handleInquire = (karya: Karya) => {
    // TODO: Implement inquire functionality
    console.log("Inquiring about:", karya);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden pt-24">
        {/* Animated background */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <BackgroundPattern />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center mb-12"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter mb-4"
              variants={fadeUp}
            >
              Lokapasar Karya Budaya
            </motion.h1>
            <motion.p
              className="text-foreground/80 md:text-lg max-w-2xl mx-auto"
              variants={fadeUp}
            >
              Jelajahi koleksi karya budaya Indonesia yang autentik dan bermakna
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {categories.map((category) => {
              const isActive =
                selectedCategory === category ||
                (!selectedCategory && category === "All");
              return (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === "All" ? null : category)
                  }
                  className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide border transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-slate-50 border-slate-900 dark:bg-slate-50 dark:text-slate-900"
                      : "bg-transparent text-slate-700 border-slate-300 hover:border-slate-900 dark:text-slate-200 dark:border-slate-700"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200/80 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/40 p-6 backdrop-blur-sm shadow-sm animate-pulse"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-2/5 aspect-square rounded-2xl bg-slate-200/70 dark:bg-slate-800" />
                    <div className="flex-1 space-y-4">
                      <div className="h-5 w-3/4 rounded bg-slate-200/70 dark:bg-slate-800" />
                      <div className="h-4 w-1/2 rounded bg-slate-200/70 dark:bg-slate-800" />
                      <div className="h-4 w-full rounded bg-slate-200/70 dark:bg-slate-800" />
                      <div className="h-10 w-2/3 rounded bg-slate-200/70 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Karya Grid */
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredKarya.map((karya) => (
                <motion.article
                  key={karya.id}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/40 p-6 backdrop-blur-md shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-2/5">
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200/70 dark:bg-slate-900/60 ring-1 ring-white/40 dark:ring-white/10">
                        {karya.image_url ? (
                          <img
                            src={karya.image_url}
                            alt={karya.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-slate-400" />
                          </div>
                        )}
                        <span
                          className={`absolute top-3 right-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                            categoryStyles[karya.category] ??
                            "text-slate-700 bg-slate-200/80 dark:text-slate-300 dark:bg-slate-700/30"
                          }`}
                        >
                          {karya.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                            {karya.title}
                          </h3>
                          {karya.artist_name && (
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              {karya.artist_name}
                            </p>
                          )}
                        </div>

                        {karya.description && (
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                            {karya.description}
                          </p>
                        )}

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 px-4 py-3">
                            <dt className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                              Medium
                            </dt>
                            <dd className="mt-1 text-slate-700 dark:text-slate-200">
                              {karya.medium}
                            </dd>
                          </div>
                          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 px-4 py-3">
                            <dt className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                              Dimensi
                            </dt>
                            <dd className="mt-1 text-slate-700 dark:text-slate-200">
                              {karya.dimensions}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                          {formatPrice(karya.price)}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleBuy(karya)}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-transform duration-200 hover:scale-105 hover:shadow-xl dark:from-slate-100 dark:to-slate-200 dark:text-slate-900"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Beli
                          </button>
                          <button
                            onClick={() => handleInquire(karya)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-300 dark:hover:text-slate-100"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Tanya
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredKarya.length === 0 && (
            <motion.div
              className="text-center py-20"
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <p className="text-foreground/60 text-lg">
                Tidak ada karya yang ditemukan
              </p>
            </motion.div>
          )}

          {/* Results Count */}
          {!loading && filteredKarya.length > 0 && (
            <motion.div
              className="text-center mt-12 text-foreground/60"
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <p>
                Menampilkan {filteredKarya.length} dari {karyaList.length} karya
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

