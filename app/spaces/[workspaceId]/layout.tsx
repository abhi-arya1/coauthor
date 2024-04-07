"use client";
import { SearchCommand } from "@/components/searchbox";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect, useParams } from "next/navigation";

export default function SpacesLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { workspaceId } = useParams();

  if (isLoading) {
    return (
      <div className="h-full flex flex-col gap-x-2 items-center justify-center dark:bg-[#1F1F1F]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated && !isLoading) {
    return redirect("/");
  }

  return (
    <div className="max-h-screen flex dark:bg-[#1F1F1F]">
      <main className="w-full max-h-screen dark:bg-[#1F1F1F]">
      <SearchCommand workspaceId={workspaceId.toString()} />
        {children}
      </main>
    </div>
  );
}