"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

interface BoxParams {
    pageData: Doc<"webpage">
    workspaceId: string 
}

const WebBox = ({ pageData, workspaceId }: BoxParams) => {
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
        <div className="pt-4">
        <Card className="max-w-[350px] max-h-[350px] p-2">
        <CardHeader>
        <CardTitle><span className="text-wrap">{page.title}</span></CardTitle>
        <CardDescription className="overflow-hidden text-ellipsis"><p className="text-wrap text-ellipsis max-h-[140px]">{page.abstract}...</p></CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <Button onClick={() => {window.open(page.url)}}>
                View Site
            </Button>
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
        </CardFooter>
        </Card> 
        </div>
    );
}
 
export default WebBox;