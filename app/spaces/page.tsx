"use client";

import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { ModeToggle } from "@/components/mode_toggle";

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
    <div className="flex flex-col self-center justify-self-center">
      <div>
        Welcome, {user?.fullName || "User"}!
      </div>
    </div>
  );
}
