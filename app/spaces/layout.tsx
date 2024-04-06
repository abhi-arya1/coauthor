"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Boxes } from "@/components/ui/background-boxes";

export default function SpacesLayout({
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

  if (!isAuthenticated && !isLoading) {
    return redirect("/");
  }

    return (
      <div className="h-screen flex justify-center items-center dark:bg-[#1F1F1F]">
        <main className="overflow-y-auto dark:bg-[#1F1F1F]">
        <div className="h-[100vh] relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
            {children}
        </div>
        
        </main>
      </div>
      
    );
  }
