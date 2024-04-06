import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createWorkspace = mutation({
    args: {
        creator: v.string(),
        name: v.string(), 
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const creator = await context.db
        .query("user")
        .filter(q => q.eq(q.field("userId"), args.creator))
        .first(); 

        const existingWorkspace = await context.db
        .query("workspace")
        .filter(q => q.eq(q.field("name"), args.name))
        .first();  

        if (existingWorkspace) { return null; }
        if (!creator) { return null; }

        const document = await context.db.insert("workspace",
        {
            creator: creator?._id,
            name: args.name,
            sharedUsers: [],
            chatHistory: [],
            webpages: "",
            noteblock: "",
            bookmarks: []
        });

        return document; 
    }
})

export const getWorkspaceById = query({
    args: { workspaceId: v.string() }, 
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const workspace = await ctx.db
        .query("workspace")
        .filter((q) => q.eq(q.field("_id"), args.workspaceId))
        .first();

        if (!workspace) {
            return null;
        }

        const user = await ctx.db 
        .query("user")
        .filter((q) => q.eq(q.field("_id"), workspace.creator))
        .first(); 

        return {
            creator: user,
            name: workspace.name,
            sharedUsers: workspace.sharedUsers,
            chatHistory: workspace.chatHistory,
            webpages: workspace.webpages,
            noteblock: workspace.noteblock,
            bookmarks: workspace.bookmarks,
        };
    }
})

export const getWorkspacesByCreator = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const user = await ctx.db 
        .query("user")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first(); 

        const wksps = await ctx.db
        .query("workspace")
        .filter((q) => q.eq(q.field("creator"), user?._id))
        .collect();

        
        const workspaces = wksps.map(wksp => ({
            creator: wksp.creator,
            name: wksp.name,
            sharedUsers: wksp.sharedUsers,
            chatHistory: wksp.chatHistory,
            webpages: wksp.webpages,
            noteblock: wksp.noteblock,
            bookmarks: wksp.bookmarks,
        }));

        return workspaces;
    }
})