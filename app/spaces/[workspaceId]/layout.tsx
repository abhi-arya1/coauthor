"use client";

import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useConvexAuth, useQuery } from "convex/react";
import { redirect, useParams } from "next/navigation";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth(); 

  if (isLoading) {
    return (
        <div className="h-full flex flex-col gap-x-2 items-center justify-center dark:bg-[#1F1F1F]">
            <Spinner size="lg" />
        </div>
    )
  }

  if (!isAuthenticated) { 
    return redirect("/");
  }

  return (
    <div className="h-screen dark:bg-[#1F1F1F]">
        <main className="dark:bg-[#1F1F1F]">
            {children}
        </main>
    </div> 
  );
}
