"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, easeOut } from "framer-motion";
import { Image } from "lucide-react";
import Navbar from "@/components/navbar";
import { BackgroundPattern } from "@/components/background-pattern";
import Footer from "@/components/footer";

const HEIGHT_OPTIONS = [
  520, 380, 620, 460, 500, 540, 580, 620, 660, 700, 400, 300, 440, 700, 520,
  560, 600, 640, 680,
];

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
  highlight?: string;
}

export default function MarketplacePage() {
  const [karyaList, setKaryaList] = useState<Karya[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const layoutMap = useMemo(() => {
    const map = new Map<string, { height: number; spanAll: boolean }>();
    karyaList.forEach((karya, index) => {
      map.set(karya.id, {
        height: HEIGHT_OPTIONS[index % HEIGHT_OPTIONS.length],
        spanAll: false,
      });
    });
    return map;
  }, [karyaList]);

  useEffect(() => {
    fetchKarya();
  }, []);

  const fetchKarya = async () => {
    try {
      setLoading(true);

      const mockKarya: Karya[] = [
        {
          id: "1",
          title: "Wayang Kulit Modern",
          category: "2D",
          medium: "Kulit Sapi, Cat Akrilik",
          dimensions: '30" x 24"',
          price: 2500000,
          artist_name: "Budi Santoso",
          description: "Karya wayang kulit kontemporer dengan sentuhan modern",
          highlight: "Pilihan Kurator",
          image_url:
            "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
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
          highlight: "Best in Show - 2D",
          image_url:
            "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80",
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
          highlight: "First Place - 3D",
          image_url:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "4",
          title: "Lukisan Pemandangan Bali",
          category: "2D",
          medium: "Cat Minyak di Kanvas",
          dimensions: '60" x 40"',
          price: 4500000,
          artist_name: "Ketut Surya",
          description: "Lukisan pemandangan sawah terasering di Bali",
          highlight: "People's Choice",
          image_url:
            "https://images.unsplash.com/photo-1526481280695-3c46917f14dd?auto=format&fit=crop&w=1200&q=80",
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
          highlight: "Honorable Mention",
          image_url:
            "https://images.unsplash.com/photo-1457374258525-8560d3b5c2ed?auto=format&fit=crop&w=1200&q=80",
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
          highlight: "Second Place - 2D",
          image_url:
            "https://images.unsplash.com/photo-1617032449332-5616b0dcd389?auto=format&fit=crop&w=1200&q=80",
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
          highlight: "Favorite of the Week",
          image_url:
            "https://images.unsplash.com/photo-1516349935484-a69b0b87f519?auto=format&fit=crop&w=1200&q=80",
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
          highlight: "Editor's Pick",
          image_url:
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
        },
      ];

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
    console.log("Buying:", karya);
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
              Lokapasar Karya
            </motion.h1>
            <motion.p
              className="text-foreground/80 md:text-lg max-w-2xl mx-auto"
              variants={fadeUp}
            >
              Jelajahi koleksi karya seniman Indonesia yang autentik dan
              bermakna
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
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {[...Array(9)].map((_, i) => {
                const skeletonHeight =
                  HEIGHT_OPTIONS[i % HEIGHT_OPTIONS.length];
                const spanAll = (i + 1) % 5 === 0;
                return (
                  <div
                    key={i}
                    className="mb-6 animate-pulse break-inside-avoid"
                    style={{
                      columnSpan: spanAll ? "all" : "none",
                    }}
                  >
                    <div
                      className="w-full bg-slate-200/70 dark:bg-slate-800 rounded-lg"
                      style={{ height: `${skeletonHeight}px` }}
                    />
                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-3/4 bg-slate-200/70 dark:bg-slate-800 rounded" />
                      <div className="h-3 w-1/2 bg-slate-200/70 dark:bg-slate-800 rounded" />
                      <div className="h-3 w-full bg-slate-200/70 dark:bg-slate-800 rounded" />
                      <div className="h-3 w-2/3 bg-slate-200/70 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Karya Masonry Grid */
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredKarya.map((karya) => {
                const layout = layoutMap.get(karya.id) || {
                  height: 400,
                  spanAll: false,
                };
                return (
                  <motion.article
                    key={karya.id}
                    variants={fadeUp}
                    className="break-inside-avoid mb-6"
                    style={{
                      columnSpan: layout.spanAll ? "all" : "none",
                    }}
                  >
                    <div
                      className="relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                      style={{
                        height: karya.image_url
                          ? `${layout.height}px`
                          : "300px",
                      }}
                    >
                      {karya.image_url ? (
                        <img
                          src={karya.image_url}
                          alt={karya.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-200/70 dark:bg-slate-900/60">
                          <Image className="h-12 w-12 text-slate-400" />
                        </div>
                      )}
                      <span
                        className={`absolute top-4 left-4 inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                          categoryStyles[karya.category] ??
                          "text-slate-900 bg-white/80 dark:text-slate-200 dark:bg-slate-900/70"
                        }`}
                      >
                        {karya.category}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {karya.highlight && (
                        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                          {karya.highlight}
                        </p>
                      )}

                      <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {karya.title}
                      </h3>

                      {karya.artist_name && (
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {karya.artist_name}
                        </p>
                      )}

                      {karya.description && (
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                          {karya.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                        <span>{karya.medium}</span>
                        <span>•</span>
                        <span>{karya.dimensions}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {formatPrice(karya.price)}
                        </p>
                        <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-[0.25em]">
                          <button
                            onClick={() => handleBuy(karya)}
                            className="inline-flex items-center gap-1 border border-slate-900 px-3 py-1 text-slate-900 transition-colors duration-150 hover:bg-slate-900 hover:text-white dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-900"
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
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
