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
 
export default MarketingLayout;