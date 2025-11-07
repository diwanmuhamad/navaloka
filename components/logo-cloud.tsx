import { Logo01, Logo02, Logo03 } from "@/components/logos";
import { Marquee } from "@/components/ui/marquee";

const LogoCloud = () => {
  return (
    <div className="flex items-center justify-center px-6 my-10">
      <div className="overflow-hidden">
        <p className="text-center text-xl font-medium">Powered By</p>

        <div className="mt-10 flex items-center justify-center gap-x-14 gap-y-10 max-w-(--breakpoint-xl)">
          <Marquee
            pauseOnHover
            className="[--duration:20s] [&_svg]:mr-10 mask-x-from-70% mask-x-to-90%"
          >
            <Logo01 />
            <Logo02 />
            <div className="ml-20">
              <Logo03 />
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
