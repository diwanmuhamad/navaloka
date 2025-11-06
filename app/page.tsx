import FAQ from "@/components/faq";
import Features from "@/components/features01";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Testimonials from "@/components/testimonials";
import Feature02 from "@/components/features";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature02 />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
