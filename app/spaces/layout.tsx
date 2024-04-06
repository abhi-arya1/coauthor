"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

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

  if (!isAuthenticated) {
    return redirect("/");
  }
  
  return (
    <html lang="en">
      <body>
              {children}
      </body>
    </html>
    
  );
}
