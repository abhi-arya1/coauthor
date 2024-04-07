"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

interface BoxParams {
    page: Doc<"webpage">,
    workspaceId: string 
}

const WebBox = ({ page, workspaceId }: BoxParams) => {
    const addBookmark = useMutation(api.workspace.addBookmark);
    const removeBookmark = useMutation(api.workspace.removeBookmark);
    const bookmarks = useQuery(api.workspace.getBookmarks, { workspaceId });
    const [bookmarked, setBookmarked] = useState(false); 
    
    useEffect(() => {
        if (bookmarks?.includes(page._id)) {
            setBookmarked(true)
        }
    }, [bookmarks, page._id, setBookmarked])

    return ( 
        <Card className="w-[350px] p-2">
        <CardHeader>
        <CardTitle>{page.title}</CardTitle>
        <CardDescription className="overflow-hidden">{page.abstract}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <Button onClick={() => {window.open(page.url)}}>
                View Site
            </Button>
            <Button className={`rounded-full p-2 transition-all ${bookmarked ? 'bg-yellow-500' : ''}`} onClick={() => {
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
    );
}
 
export default WebBox;