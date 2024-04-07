"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanText, Star } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface BoxParams {
    pageData: Doc<"webpage">
    workspaceId: string 
    isInChatbox: boolean
}

const WebBox = ({ pageData, workspaceId, isInChatbox }: BoxParams) => {
    const addBookmark = useMutation(api.workspace.addBookmark);
    const removeBookmark = useMutation(api.workspace.removeBookmark);
    const bookmarks = useQuery(api.workspace.getBookmarks, { workspaceId });
    const page = pageData
    const [bookmarked, setBookmarked] = useState(false);


    useEffect(() => {
        if (bookmarks?.includes(page._id)) {
            setBookmarked(true)
        } else { 
            setBookmarked(false); 
        }
    }, [bookmarks, page._id, setBookmarked])

    return ( 
        <div className="pt-4 transition-all">
        <Card className="max-w-[350px] max-h-[350px] p-2 shadow-2xl">
        <CardHeader>
        <CardTitle><span className="text-wrap dark:text-[#B8BEDD] text-[#1F1F1F]">{page.title}</span></CardTitle>
        <CardDescription className="overflow-hidden text-ellipsis"><p className="text-wrap text-ellipsis max-h-[140px]">{!isInChatbox ? (page.abstract) : page.summary}...</p></CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <Button onClick={() => {window.open(page.url)}}>
                View Site
            </Button>
            <div className="flex flex-row gap-x-2">
            <Button className={`rounded-full p-2 transition-all dark:hover:bg-yellow-600 hover:bg-yellow-700 ${bookmarked ? 'bg-yellow-500 dark:bg-yellow-500' : ''}`} onClick={() => {
                if (bookmarked) {
                    setBookmarked(false);
                    removeBookmark({ workspaceId, webpageId: page._id })
                } else {
                    addBookmark({ workspaceId, webpageId: page._id })
                }
            }}>
                <Star />
            </Button>
            <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className={`rounded-full p-2`} onClick={() => {
                        navigator.clipboard.writeText(page.citation || 'Citation wasn\'t provided')
                    }}>
                        <ScanText />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="pl-2">
                <div className="pl-3"/>
                <p className="p-2 bg-black dark:bg-white rounded-md text-white dark:text-black">Cite Paper</p>
                </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            </div>
        </CardFooter>
        </Card> 
        </div>
    );
}
 
export default WebBox;