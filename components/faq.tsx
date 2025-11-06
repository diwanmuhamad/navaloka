import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "Apa kebijakan pengembalian Anda?",
    answer:
      "Anda dapat mengembalikan barang yang belum digunakan dalam kemasan aslinya dalam 30 hari untuk pengembalian dana atau penukaran. Hubungi dukungan untuk bantuan.",
  },
  {
    question: "Bagaimana cara melacak pesanan saya?",
    answer:
      "Lacak pesanan Anda menggunakan tautan yang disediakan dalam email konfirmasi, atau masuk ke akun Anda untuk melihat detail pelacakan.",
  },
  {
    question: "Apakah Anda mengirim ke luar negeri?",
    answer:
      "Ya, kami mengirim ke seluruh dunia. Biaya pengiriman dan waktu pengiriman bervariasi berdasarkan lokasi, dan bea cukai mungkin berlaku untuk beberapa negara.",
  },
  {
    question: "Metode pembayaran apa yang Anda terima?",
    answer:
      "Kami menerima Visa, MasterCard, American Express, PayPal, Apple Pay, dan Google Pay, memastikan opsi pembayaran yang aman untuk semua pelanggan.",
  },
  {
    question: "Bagaimana jika saya menerima barang yang rusak?",
    answer:
      "Silakan hubungi tim dukungan kami dalam 48 jam setelah pengiriman dengan foto barang yang rusak. Kami akan mengatur penggantian atau pengembalian dana.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-start gap-x-12 gap-y-6">
        <h2 className="text-4xl lg:text-5xl leading-[1.15]! font-semibold tracking-tighter">
          Pertanyaan yang <br /> Sering Diajukan
        </h2>

        <Accordion type="single" defaultValue="question-0" className="max-w-xl">
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
