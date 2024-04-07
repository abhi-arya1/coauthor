"use client";

import { useUser } from "@clerk/clerk-react";
import { useParams, useRouter } from "next/navigation";
import { getByUserId, getUserById } from "@/convex/user";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  



export default function ProfilePage() {
    const router = useRouter(); 
    const { userId } = useParams();

    const user = useQuery(api.user.getByUserId, {
        userId: userId.toString(),
    })

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <span>
                            <div className="rounded-2xl">
                                <img
                                    src={user?.pfpUrl}
                                    width="20"
                                    height="20"
                                >
                                </img>
                            </div>
                            {user?.name}
                        </span>
                    </CardTitle>
                    <CardDescription><span className="italic">{user?.email}</span></CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
