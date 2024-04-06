export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen dark:bg-[#1F1F1F]">
        <main className="dark:bg-[#1F1F1F]">
            {children}
        </main>
    </div> 
  );
}
