import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { BackgroundPattern } from "@/components/background-pattern";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          Budaya. Kreativitas. Teknologi.
        </h1>
        <p className="mt-6 md:text-lg text-foreground/80">
          Satu platform untuk masa depan budaya Indonesia - Menghadirkan
          ekosistem budaya yang autentik, transparan, dan berkelanjutan dengan
          AI & Blockchain.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Mulai Sekarang <ArrowUpRight className="h-5! w-5!" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="h-5! w-5!" /> Lihat Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
