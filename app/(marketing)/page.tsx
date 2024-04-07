"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import TwoColumnSectionLeftImg from "./_components/two-column-section-imgleft";
import TwoColumnSectionRightImg from "./_components/two-column-section-imgright";
import TwoColumnSectionLeftImgSecond from "./_components/two-column-section-leftimg_two";
import Footer from "./_components/footer";
import { FunctionSquare } from "lucide-react";

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
          src={`/dashboard_light.png`}
          alt="hero"
          height={100}
          width={700}
          className="rounded-2xl object-cover h-full w-full dark:hidden"
          draggable={false}
        />
        <Image
          src={`/dashboard_dark.png`}
          alt="hero"
          height={100}
          width={700}
          className="rounded-2xl object-cover h-full w-full hidden dark:block"
          draggable={false}
        />
      </ContainerScroll>
      <TwoColumnSectionLeftImg
        description="Every workspace includes real-time markdown notes, allowing you and your coworkers to always be on the same page."
        title="Collaborate with your colleagues at every breakthrough" 
      />
      <TwoColumnSectionRightImg
        description="Your very own AI assistant trained on the context of your research by your side every step of the way to suggest papers, topics, and more."
        title="Chat with self-training AI to guide your pioneering research"
      />
      <TwoColumnSectionLeftImgSecond
        description="Save your favorite sites from the AI assistant, pinning them to your workspace for later use."
        title="Bookmark Your Favorite Sites" 
      />
    </div>
    
  );
}