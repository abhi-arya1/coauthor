"use client";

import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";

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
    <div className="flex flex-col items-center justify-center">
        <span className="text-6xl font-mono">coauthor.ai, {user?.fullName}</span>
    </div>
  );
}
