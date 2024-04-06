import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Navbar } from "./_components/navbar";
import { AuroraBackground } from "@/components/ui/aurora_background";
import Link from "next/link";
import { Badge } from "lucide-react";

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
            <MacbookScroll
                    title={
                        <span>
                          Your next research assistant.
                        </span>
                      }
                    //   badge={
                    //     <Link href="https://peerlist.io/manuarora">
                    //       <Badge className="h-10 w-10 transform -rotate-12" />
                    //     </Link>
                    //   }
                      src={`/linear.webp`}
                      showGradient={true}
                />
            
        </div>
     );
}
 
export default MarketingLayout;