/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { UserButton, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CircleMinus, Crown, Minus, UserCog, UserPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode_toggle";
import { InputWithButton } from "./_components/chatbox";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/use-search";

const WorkspacePage = () => {
  const [ownerName, setOwnerName] = useState('User')
  const { workspaceId } = useParams();
  const { user } = useUser(); 
  const { resolvedTheme } = useTheme();
  const editor = useCreateBlockNote();
  const workspaceMeta = useQuery(api.workspace.getWorkspaceById, { workspaceId: workspaceId.toString() });
  if (workspaceMeta && user?.id !== workspaceMeta?.creator?.userId && !workspaceMeta?.sharedUsers.includes(user?.id || 'user_0'
  )) {
    return redirect('/');
  }

  useEffect(() => {
    console.log(workspaceMeta);
    if (workspaceMeta && workspaceMeta?.creator?.name) {
      setOwnerName(workspaceMeta.creator.name)
    }
  }, [workspaceMeta, workspaceMeta?.creator?.name])


  const sharedUserData = useQuery(api.workspace.getUsernamesByWorkspace, { workspaceId: workspaceId.toString() });
  const removeFromWorkspace = useMutation(api.workspace.removeUserFromWorkspace);

  const router = useRouter(); 

  const handlePrint = () => {
    window.print();
  };

  return ( 
    <div className="flex flex-col h-screen w-screen">

      <div className="absolute top-5 left-5">
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/spaces">{ownerName}&apos;s Spaces</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/spaces/${workspaceId}`}>{workspaceMeta?.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="absolute top-5 right-5 ">
        <ModeToggle />
      </div>

      <div className="absolute top-6 right-[4.4rem]">
        <UserButton />
      </div>

      <div className="absolute right-28 top-5">
        <Menubar className="bg-white dark:bg-[#1a1a1a]">
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-100 dark:hover:bg-neutral-800">File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick = {handlePrint}>
              Save 
            </MenubarItem>
            <MenubarItem>
              Capture Workspace 
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-100 dark:hover:bg-neutral-800">Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-100 dark:hover:bg-neutral-800">View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset onClick={() => {router.refresh()}}>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-100 dark:hover:bg-neutral-800"><Users className="h-5 w-5" /></MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>Current Members</MenubarItem>
            <MenubarRadioGroup>
              {sharedUserData?.length === 0 && (
                <MenubarRadioItem value="none" className="text-muted-foreground italic">No Shared Users...</MenubarRadioItem>
              )}
              {sharedUserData?.map(_user => (
                <HoverCard key={0}>
                  <HoverCardTrigger>
                    <MenubarRadioItem key={_user.userId} value={_user.userId || 'user_0'} className="items-center">
                      {_user.name} 
                      {_user._id === workspaceMeta?.creator?._id && <Crown className="h-4 w-4 pl-1 text-orange-500 dark:text-[#FFD700]" />}  
                      {_user._id !== workspaceMeta?.creator?._id && user?.id == workspaceMeta?.creator?.userId && <CircleMinus className="h-6 w-6 pl-2 hover:text-red-700" onClick={key => {
                          removeFromWorkspace({
                            userId: _user.userId || 'user_0',
                            workspaceId: workspaceId.toString()
                          })
                      }}/>}
                    </MenubarRadioItem>
                  </HoverCardTrigger>
                  <HoverCardContent sideOffset={5} side="left">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center justify-start">
                      { /* eslint-disable-next-line @next/next/no-img-element */ }
                      <img src={_user?.pfpUrl} alt={_user?.name} className="h-5 w-5 rounded-full" />
                      <h4 className="text-sm font-semibold pl-2">{_user?.name}</h4>
                      </div>
                      <a className="text-sm italic pt-2" href={`mailto:${_user?.email}`}>{_user?.email}</a>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </MenubarRadioGroup>
            { user?.id === workspaceMeta?.creator?.userId && (
            <>
              <MenubarSeparator />
              <MenubarItem inset onClick={useSearch().onOpen}><UserPlus className="h-4 w-4" /><span className="pl-2">Add Users </span></MenubarItem>
            </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      </div>

      <div className="flex flex-grow pt-12">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full rounded-md"
        >
          <ResizablePanel defaultSize={35}>
            <div className="flex h-full items-end justify-center p-6">
              <InputWithButton placeholder="Chat with Gemini" onInputSubmit={(input) => {console.log(input)}}/>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical" className="h-full w-full">
              <ResizablePanel>
                <div className="flex h-full w-full items-center justify-center p-6">
                  <ScrollArea>
                    <Card key={0} className="w-[350px]">
                        <CardHeader>
                          <CardTitle>SITE_NAME</CardTitle>
                          <CardDescription>INFO</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                          <Button>
                            OPEN LINK
                          </Button>
                        </CardFooter>
                    </Card>
                  </ScrollArea>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <BlockNoteView className="py-5 z-0" editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"}/>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
   );
}
 
export default WorkspacePage;