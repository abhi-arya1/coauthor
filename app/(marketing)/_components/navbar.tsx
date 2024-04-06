"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode_toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";


export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()

    return (
        <div className={cn(
            "z-50 fixed top-0 flex items-center w-full p-6"
        )}>
            <Link href="/">
                <Image 
                    src={"/coauth_peri.png"} // Your image path
                    alt="Logo"
                    width={40} // Adjust as needed
                    height={40} // Adjust as needed
                    style={{ borderRadius: '10px', cursor: 'pointer' }}
                    className="drop-shadow-2xl hidden dark:block"
                />
                <Image 
                    src={"/coauth_metal.png"} // Your image path
                    alt="Logo"
                    width={40} // Adjust as needed
                    height={40} // Adjust as needed
                    style={{ borderRadius: '10px', cursor: 'pointer' }}
                    className="drop-shadow-2xl dark:hidden"
                />
            </Link>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-4">
                {isLoading && (
                    <div>
                        <Spinner />
                    </div>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton 
                            mode="modal"
                            afterSignInUrl="/spaces"
                        >
                            <Button variant="link" size="sm">
                                Log In
                            </Button>
                        </SignInButton>
                        <SignUpButton 
                            mode="modal"
                            afterSignUpUrl="/spaces"
                        >
                            <Button size="sm">
                                Join Coauthor
                            </Button>
                        </SignUpButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button size="sm" asChild>
                        <Link href="/spaces">
                            Enter Coauthor
                        </Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}