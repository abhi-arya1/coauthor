"use client";

import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { ModeToggle } from "@/components/mode_toggle";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { InputWithButton } from "./_components/space_input";
import { useRouter } from "next/navigation";

export interface Artwork {
  artist: string
  art: string
}
 
export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

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
        <Drawer>
        <DrawerTrigger>
          <Button className="text-xl font-semibold pr-3" variant={"link"}>
          Your Workspaces
        </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            Workspaces
          </DrawerHeader>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {/* {works.map((artwork) => (
                <figure key={artwork.artist} className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src="/coauth_metal.png"
                      alt={`Photo by ${artwork.artist}`}
                      className="aspect-[3/4] h-fit w-fit object-cover"
                      width={300}
                      height={400}
                    />
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">
                    Photo by{" "}
                    <span className="font-semibold text-foreground">
                      {artwork.artist}
                    </span>
                  </figcaption>
                </figure>
              ))} */}
              { workspaces && workspaces?.map(space => (
                <Card key={0} className="w-[350px]">
                  <CardHeader>
                    <CardTitle>{space.name}</CardTitle>
                    <CardDescription>By: </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="framework">Framework</Label>
                          <Image
                                  src="/coauth_metal.png"
                                  alt={`Photo`}
                                  className="aspect-[3/4] h-fit w-fit object-cover"
                                  width={300}
                                  height={400}
                                />
                        </div>
                      </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button>Open</Button>
                  </CardFooter>
                </Card>
            ))}
              
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <DrawerFooter>
            <Button>Submit</Button>
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
