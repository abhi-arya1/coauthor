"use client";

import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { ModeToggle } from "@/components/mode_toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { InputWithButton } from "./_components/space_input";
import { useRouter } from "next/navigation";

export default function SpaceBuilder() {
  const createUser = useMutation(api.user.createUser);
  const createWorkspace = useMutation(api.workspace.createWorkspace);
  const { user } = useUser(); 
  const router = useRouter(); 
  createUser({ 
    userId: user?.id || 'user_0',
    name: user?.fullName || 'User',
    email: user?.primaryEmailAddress?.emailAddress || "Err",
    pfpUrl: user?.profileImageUrl || "Err"
  });

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); 

  const handleCreateWorkspace = (name: string) => {
    createWorkspace({
      creator: user?.id || 'user_0',
      name: name
    }).then(async (workspace) => {
      await sleep(500);
      router.push(`/spaces/${workspace}`);
    })
  }
    
  return (
    <div className="flex flex-row items-center justify-center gap-x-60">
      <div className="absolute top-5 left-5">
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/spaces">{user?.firstName}&apos;s Spaces</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
      </Breadcrumb>
      </div>
      <div className="z-10 absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="flex flex-row items-center justify-center">
        <span className="z-10 font-bold text-3xl">Welcome, {user?.fullName || "User"} </span>
      </div>
      <div className="z-10 flex flex-col">
        <div className="flex flex-row items-center justify-center">
        <Button className="text-xl font-semibold pr-3" variant={"link"}>
          Your Workspaces
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
              <div 
              role="button" 
              className="dark:bg-[#b8bedd] hover:dark:bg-[#979cb6] text-white dark:text-black hover:bg-[#696969] transition-all bg-[#092327] rounded-md"
              onClick={() => {
                
              }}
            >
              <Plus className="h-5 w-5" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a New Workspace</AlertDialogTitle>
            <AlertDialogDescription>
              <InputWithButton onInputSubmit={handleCreateWorkspace} placeholder="Enter a workspace name" buttonName="Submit" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel className="">Cancel</AlertDialogCancel>
        </AlertDialogContent>
        </AlertDialog>
        </div>
       
      </div>
    </div>
  );
}
