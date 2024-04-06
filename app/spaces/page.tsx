"use client";

import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { ModeToggle } from "@/components/mode_toggle";
import { Boxes } from "@/components/ui/background-boxes";

export default function SpaceBuilder() {
  const createUser = useMutation(api.user.createUser);
  const { user } = useUser(); 
  createUser({ 
    userId: user?.id || 'user_0',
    name: user?.fullName || 'User',
    email: user?.primaryEmailAddress?.emailAddress || "Err",
    pfpUrl: user?.profileImageUrl || "Err"
  });
    
  return (
    <div className="flex flex-row items-center justify-center gap-x-60">
      <div className="z-10 absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="flex flex-row items-center justify-center">
        <span className="z-10 font-bold text-3xl">Welcome, {user?.fullName || "User"} </span>
        <Boxes />
      </div>
      <div className="z-10 flex flex-col">
        <span className="text-xl font-semibold">Your Workspaces</span>
      </div>
    </div>
  );
}
