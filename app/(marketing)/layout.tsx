import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="h-full pt-40 pb-40 dark:bg-[#1F1F1F]">
                {children}
            </main>
        </div>
     );
}
 
export default MarketingLayout;