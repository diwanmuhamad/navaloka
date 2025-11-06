import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

const Contact = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight">
        Hubungi Kami
      </h2>
      <p className="mt-4 text-base sm:text-lg text-muted-foreground">
        Tim ramah kami selalu siap membantu Anda.
      </p>
      <div className="max-w-(--breakpoint-xl) mx-auto py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 px-6 md:px-0">
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
            <MailIcon />
          </div>
          <h3 className="mt-6 font-semibold text-xl">Email</h3>
          <p className="mt-2 text-muted-foreground">
            Tim ramah kami siap membantu Anda.
          </p>
          <Link
            className="mt-4 font-medium text-primary"
            href="mailto:akashmoradiya3444@gmail.com"
          >
            akashmoradiya3444@gmail.com
          </Link>
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
            <MapPinIcon />
          </div>
          <h3 className="mt-6 font-semibold text-xl">Kantor</h3>
          <p className="mt-2 text-muted-foreground">
            Datang dan sapa kami di kantor pusat kami.
          </p>
          <Link
            className="mt-4 font-medium text-primary"
            href="https://map.google.com"
            target="_blank"
          >
            100 Smith Street Collingwood <br /> VIC 3066 AU
          </Link>
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
            <PhoneIcon />
          </div>
          <h3 className="mt-6 font-semibold text-xl">Telepon</h3>
          <p className="mt-2 text-muted-foreground">Senin-Jumat dari jam 8 pagi hingga 5 sore.</p>
          <Link
            className="mt-4 font-medium text-primary"
            href="tel:akashmoradiya3444@gmail.com"
          >
            +1 (555) 000-0000
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
