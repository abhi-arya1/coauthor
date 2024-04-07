"use client"; 

import { useEffect, useState } from "react"; 
import { useMutation, useQuery } from "convex/react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput, 
    CommandItem, 
    CommandList,
} from "@/components/ui/command"
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";

interface SearchParams{
    workspaceId: string; 
}

export const SearchCommand = ({ workspaceId }: SearchParams) => {
    const users = useQuery(api.user.getAllUsersForSearch);
    const updateWorkspace = useMutation(api.workspace.addUserToWorkspace);
    const [isMounted, setMounted] = useState(false); 
    
    const toggle = useSearch((store) => store.toggle); 
    const isOpen = useSearch((store) => store.isOpen); 
    const onClose = useSearch((store) => store.onClose); 

    useEffect(() => {
        setMounted(true); 
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle(); 
            }
        }

        document.addEventListener("keydown", down); 
        return () => document.removeEventListener("keydown", down); 
    }, [toggle]);

    const onSelect = (id: string) => {
        updateWorkspace({
            workspaceId: workspaceId,
            userId: id.split("-")[0],
        });
        onClose();
    }

    if (!isMounted) {
        return null; 
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Invite Users...`}/>
            <CommandList>
                <CommandEmpty>No Results Found...</CommandEmpty>
                <CommandGroup heading="All Users">
                    {users?.map((user) => (
                        <CommandItem 
                        key={user.name}
                        value={`${user.userId}-${user.name}`}
                        title={user.name}
                        onSelect={onSelect}             
                        >
                            { /* eslint-disable-next-line @next/next/no-img-element */ }
                            <img src={user.pfpUrl} alt={user.name} width={30} height={30} className="rounded-full" />
                            <span className="pl-3">
                                {user.name}
                            </span>

                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}