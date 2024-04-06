import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Navbar } from "./_components/navbar";
import { AuroraBackground } from "@/components/ui/aurora_background";
import { TracingBeam } from "@/components/ui/tracing-beam";

import Link from "next/link";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Badge } from "lucide-react";
import Image from "next/image";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full dark:bg-[#1F1F1F]">
            <AuroraBackground>
                <Navbar />
                <main className="h-full w-full pt-40 pb-40 dark:text-white">
                    {children}
                </main>
            </AuroraBackground>
        </div>
     );
}

const dummyContent = [
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      description: (
        <>
          <p>
            Sit duis est minim proident non nisi velit non consectetur. Esse
            adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
            Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
            incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
            fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
            nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
            occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
            officia sint labore. Tempor consectetur excepteur ut fugiat veniam
            commodo et labore dolore commodo pariatur.
          </p>
          <p>
            Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
            veniam in commodo id reprehenderit adipisicing. Proident duis
            exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
          </p>
          <p>
            Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
            reprehenderit deserunt amet laborum consequat adipisicing officia qui
            irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
            Amet culpa officia aliquip deserunt veniam deserunt officia
            adipisicing aliquip proident officia sunt.
          </p>
        </>
      ),
      badge: "React",
    },
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      description: (
        <>
          <p>
            Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
            deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
            non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
            sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
            velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
            commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
          </p>
          <p>
            In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
            veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
            reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
            cillum ut mollit.
          </p>
        </>
      ),
      badge: "Changelog",
    },
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      description: (
        <>
          <p>
            Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
            deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
            non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
            sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
            velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
            commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
          </p>
        </>
      ),
      badge: "Launch Week",
    },
  ];
 
export default MarketingLayout;