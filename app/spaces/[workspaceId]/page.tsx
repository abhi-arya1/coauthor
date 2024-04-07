/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { redirect, useParams } from "next/navigation";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { use, useEffect, useState } from "react";
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
import { CircleMinus, Crown, Minus, Sparkles, UserCog, UserPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode_toggle";
import { InputWithButton } from "./_components/chatbox";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/use-search";
import { Spinner } from "@/components/spinner";
import { sendChatMessage } from "@/lib/utils";
import MarkdownContent from "@/components/markdowner";
import WebBox from "./_components/webpagebox";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { GenericId } from "convex/values";
import { ScrollBar } from "@/components/ui/scroll-area";


const defaultChatHistory: ChatHistory = {
  items: []
}


const WorkspacePage = () => {
  const [ownerName, setOwnerName] = useState('User')
  const { workspaceId } = useParams();
  const { user } = useUser(); 
  const { resolvedTheme } = useTheme();
  const [chatHistory, setChatHistory] = useState<ChatHistory>(defaultChatHistory); 
  const [geminiLoading, setGeminiLoading] = useState(false);
  const search = useSearch();

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

  useEffect(() => {
    setChatHistory(workspaceMeta?.chatHistory || defaultChatHistory)
  }, [workspaceMeta, workspaceMeta?.chatHistory])


  const sharedUserData = useQuery(api.workspace.getUsernamesByWorkspace, { workspaceId: workspaceId.toString() });
  const workspaceWebpages = useQuery(api.workspace.getWebpagesByWorkspace, { workspaceId: workspaceId.toString() });
  const workspaceWebpageData = useQuery(api.webpage.getWebpagesByIds, { ids: workspaceWebpages || [] });
  const bookmarks = useQuery(api.workspace.getBookmarks, { workspaceId: workspaceId.toString() });
  const bookmarkPageData = useQuery(api.webpage.getWebpagesByIds, { ids: bookmarks || [] });
  const removeFromWorkspace = useMutation(api.workspace.removeUserFromWorkspace);
  const addToChatHistory = useMutation(api.workspace.addToChatHistory);
  const createWebpage = useMutation(api.webpage.createWebpage)

  const router = useRouter(); 

  const handleChat = async (message: string) => {
    addToChatHistory({
      workspaceId: workspaceId.toString(),
      message: message,
      role: 'user',
      pages: ['NOPAGE']
    })
    setGeminiLoading(true);
    const response = await sendChatMessage(workspaceId.toString(), message, workspaceMeta?.chatHistory.items)
    setGeminiLoading(false);

    const pageNames = response.pages.map(page => page.title);
    
    response.pages.map(async page => {
       await createWebpage({
        url: page.url,
        title: page.title,
        abstract: page.abstract,
        authors: page.authors,
        date: page.date
      })
    })

    addToChatHistory({
      workspaceId: workspaceId.toString(),
      message: response.parts[0],
      pages: pageNames,
      role: 'model'
    })
  }

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
                      {_user._id === workspaceMeta?.creator?._id && <Crown className="h-6 w-6 pl-2 text-orange-500 dark:text-[#FFD700]" />}  
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
              <MenubarItem inset onClick={search.onOpen}><UserPlus className="h-4 w-4" /><span className="pl-2">Add Users </span></MenubarItem>
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
          <div className="flex flex-col max-h-screen min-w-50">
              <div className="flex-1 overflow-scroll">
                  <div className="flex flex-col p-6 text-wrap text-ellipsis break-words overflow-hidden">
                    {chatHistory.items.map((item, index) => (
                      <div
                      key={index}
                      className="bg-white dark:bg-[#484848] p-6 mb-[10px] rounded-md overflow-hidden"
                      >
                        <strong className="text-black dark:text-white">
                          {item.role === 'user' ? workspaceMeta?.name : 'Coauthor'}
                        </strong>
                        : <MarkdownContent markdown={item.parts[0]}></MarkdownContent>
                        { item.role === 'model' && workspaceWebpageData?.map((page, index) => (
                          <WebBox key={index} pageData={page} workspaceId={workspaceId.toString()} />
                        ))}
                      </div>
                    ))}
                  </div>
              </div>
              <div className="bg-white dark:bg-[#1F1F1F] p-6">
                <InputWithButton
                  placeholder="Chat with Gemini"
                  onInputSubmit={(input) => handleChat(input)}
                />
                {geminiLoading && (
                  <div className="flex flex-row self-center p-4">
                    <Sparkles />
                    <span className="pl-4">Gemini is Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />
          
          <ResizablePanel>
            <span className="font-bold text-xl p-4">Bookmarked Pages</span>
            <ResizablePanelGroup direction="vertical" className="h-full w-full">
              <ResizablePanel>
              <ScrollArea className="p-10 w-full whitespace-nowrap rounded-md overflow-x-auto bg-inherit">
                    <div className="flex flex-row w-max space-x-4 p-4">
                      {bookmarkPageData?.map((page, index) => (
                        <WebBox key={index} pageData={page} workspaceId={workspaceId.toString()} />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal"/>
                  </ScrollArea>
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
