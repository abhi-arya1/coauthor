"use client";

import { useMutation, useQuery } from "convex/react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { ModeToggle } from "@/components/mode_toggle";
import { Boxes } from "@/components/ui/background-boxes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { CircleHelp, Plus, Terminal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { InputWithButton } from "./_components/space_input";
import { useRouter } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function SpaceBuilder() {
  const createUser = useMutation(api.user.createUser);
  const createWorkspace = useMutation(api.workspace.createWorkspace);
  const { user } = useUser(); 
  const router = useRouter(); 
  const workspaces = useQuery(api.workspace.getWorkspacesByCreator, { userId: user?.id || 'user_0' });
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
      name: name,
      chatHistory: { items: [] }, 
    }).then(async (workspace) => {
      await sleep(500);
      router.push(`/spaces/${workspace}`);
    })
  }
    
  return (
    <div className="flex flex-row items-center justify-center gap-x-60">
      <BackgroundBeams />
      <div className="absolute top-5 z-[21] left-5">
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/spaces">{user?.fullName}&apos;s Spaces</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
      </Breadcrumb>
      </div>
      <div className="z-[21] absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="flex flex-row items-center justify-center z-[21]">
        <UserButton />
        <span className="font-bold text-3xl pl-3">Welcome, {user?.fullName || "User"} </span>
      </div>
      <div className="flex flex-col">
        <div className="z-[21] flex flex-row items-center justify-center">
        <Drawer>
          <DrawerTrigger>
            <Button className="text-xl font-semibold pr-3" variant={"link"}>
              Your Workspaces
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>Workspaces</DrawerHeader>
            {workspaces && workspaces.length !== 0 ? (
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                  {workspaces?.map((space) => (
                    <Card key={0} className="w-[350px]">
                      <CardHeader>
                        <CardTitle>{space?.name}</CardTitle>
                        <CardDescription>{space?.allNames}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Button onClick={() => router.push(`/spaces/${space?._id}`)}>
                          Open
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <Alert>
                  <CircleHelp className="h-5 w-5" />
                  <AlertTitle>You have no workspaces!</AlertTitle>
                  <AlertDescription>
                    Click the plus button on screen to add a new workspace.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        
        <AlertDialog>
          <AlertDialogTrigger asChild>
              <div 
              role="button" 
              className="dark:bg-[#b8bedd] hover:dark:bg-[#979cb6] text-white dark:text-black hover:bg-[#696969] transition-all bg-[#092327] rounded-md"
              onClick={() => {
                
              }}
            >
              <Plus className="h-7 w-7" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className='z-[99999]'>
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
