import { Navbar } from "./_components/navbar";
import { AuroraBackground } from "@/components/ui/aurora_background";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full dark:bg-[#1F1F1F]">
            <AuroraBackground>
                <Navbar />
                <main className="h-full pt-40 pb-40 dark:bg-[#1F1F1F]">
                    {children}
                </main>
            </AuroraBackground>
            
        </div>
     );
}
 
export default MarketingLayout;