import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="z-10 flex flex-col items-center justify-center translate-y-[-150px]">
        <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Your Next <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Research Assistant.
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/coauth_metal.png`}
          alt="hero"
          height={100}
          width={700}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
