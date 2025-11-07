"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "Identifikasi Peluang",
    description:
      "Temukan area yang belum terjamah untuk dieksplorasi dengan mudah.",
  },
  {
    title: "Bangun Otoritas",
    description: "Buat konten yang beresonansi dan menginspirasi kepercayaan.",
  },
  {
    title: "Wawasan Instan",
    description:
      "Dapatkan wawasan yang dapat ditindaklanjuti secara instan sekilas.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="grow w-full sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Nyalakan Imajinasi Anda
        </h2>

        <div className="w-full mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col text-start w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }} // animate only when 30% visible
            >
              <motion.div
                className="mb-5 sm:mb-6 w-full aspect-4/5 bg-muted rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-2xl font-semibold tracking-tight">
                {feature.title}
              </span>
              <p className="mt-2 max-w-[25ch] text-muted-foreground text-[17px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
