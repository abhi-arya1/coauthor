"use client"; 

import { useUser } from "@clerk/clerk-react";

export default function SpaceBuilder() {

	const { user } = useUser();

    return (
      <div className="flex flex-col items-center justify-center">
          <span className="text-6xl font-mono">coauthor.ai, {user?.fullName}</span>
      </div>
    );
  }
  