"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, easeOut } from "framer-motion";
import { Image } from "lucide-react";
import Navbar from "@/components/navbar";
import { BackgroundPattern } from "@/components/background-pattern";
import Footer from "@/components/footer";
import { Artwork } from "@/types/artwork";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchArtWorkRecords, totalArtWorkRecords } from "@/store/artWorkSlice";
import { toast } from "sonner";

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

export default function MarketplacePage() {
  const { records, loading } = useSelector((state: RootState) => state.artwork);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [totalCount, setTotalCount] = useState<number>(0);

  const layoutMap = useMemo(() => {
    const map = new Map<string, { height: number; spanAll: boolean }>();
    records.forEach((karya, index) => {
      map.set(karya.id, {
        height: HEIGHT_OPTIONS[index % HEIGHT_OPTIONS.length],
        spanAll: false,
      });
    });
    return map;
  }, [records]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch artworks by category
        await dispatch(
          fetchArtWorkRecords({
            artwork_format: selectedCategory,
          })
        ).unwrap();

        // 2. Fetch total count
        const count = await dispatch(totalArtWorkRecords()).unwrap();
        setTotalCount(count);
      } catch (error) {
        toast.error(`Error fetching artworks: ${error}`);
      }
    };

    fetchData();
  }, [selectedCategory, dispatch]);

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

  const handleBuy = (karya: Artwork) => {
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
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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
              {records.map((karya: Artwork) => {
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
                          categoryStyles[karya.artwork_format]
                        }`}
                      >
                        {karya.category}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {karya.title}
                      </h3>

                      {karya.creator_name && (
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {karya.creator_name}
                        </p>
                      )}

                      {karya.description && (
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                          {karya.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                        <span>{karya.artwork_type}</span>
                        <span>•</span>
                        <span>{karya.artwork_format}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {formatPrice(karya.price)}
                        </p>
                        <div className="flex gap-2 text-[11px] font-semibold uppercase tracking-[0.25em]">
                          <button
                            onClick={() => {}}
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
          {!loading && records.length === 0 && (
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
          {!loading && records.length > 0 && (
            <motion.div
              className="text-center mt-12 text-foreground/60"
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <p>
                Menampilkan {records.length} dari {totalCount} karya
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
