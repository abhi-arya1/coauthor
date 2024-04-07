import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createWorkspace = mutation({
    args: {
        creator: v.string(),
        name: v.string(),
        chatHistory: v.any(), 
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
            chatHistory: args.chatHistory,
            noteblock: "",
            bookmarks: []
        });

        return document; 
    }
})


export const getWebpagesByWorkspace = query({
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
            noteblock: workspace.noteblock,
            bookmarks: workspace.bookmarks,
        };
    }
})


export const addToChatHistory = mutation({
    args: { workspaceId: v.string(), message: v.string(), role: v.string(), pages: v.any() },
    handler: async (ctx, args) => {
        console.log(args.pages);
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

        workspace.chatHistory.items.push({
            role: args.role, 
            parts: [args.message],
            pages: args.pages
        })

        const _workspace = await ctx.db.patch(workspace._id, {
            creator: workspace.creator,
            name: workspace.name,
            sharedUsers: workspace.sharedUsers,
            chatHistory: workspace.chatHistory,
            noteblock: workspace.noteblock,
            bookmarks: workspace.bookmarks,
        })
        return _workspace
    }
})

export const updateChatHistory = mutation({
    args: { workspaceId: v.string(), chatHistory: v.any() },
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

        const _workspace = await ctx.db.patch(workspace._id, {
            creator: workspace.creator,
            name: workspace.name,
            sharedUsers: workspace.sharedUsers,
            chatHistory: args.chatHistory,
            noteblock: workspace.noteblock,
            bookmarks: workspace.bookmarks,
        })

        return _workspace;
    }
})

export const getWorkspacesByCreator = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const creatorUser = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .first();

        if (!creatorUser) {
            throw new Error("Creator user not found");
        }

        const wksps = await ctx.db
            .query("workspace")
            .filter((q) => q.eq(q.field("creator"), creatorUser._id))
            .collect();

        const workspaces = await Promise.all(wksps.map(async (wksp) => {
            const sharedUserNames = await Promise.all(
                wksp.sharedUsers.map(async (userId) => {
                    const user = await ctx.db
                        .query("user")
                        .filter((q) => q.eq(q.field("userId"), userId))
                        .first();
                    return user ? user.name : "Unknown User";
                })
            );

            const allNames = [creatorUser.name, ...sharedUserNames].join(", ");

            return {
                creator: wksp.creator,
                name: wksp.name,
                allNames, 
                sharedUsers: wksp.sharedUsers,
                chatHistory: wksp.chatHistory,
                noteblock: wksp.noteblock,
                bookmarks: wksp.bookmarks,
                _id: wksp._id
            };
        }));

        return workspaces;
    }
});



export const addUserToWorkspace = mutation({
    args: { workspaceId: v.string(), userId: v.string() },
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
            throw new Error("Workspace not found");
        }

        if (workspace.sharedUsers.includes(args.userId)) {
            return workspace;
        }

        const user = await ctx.db
        .query("user")
        .filter((q) => (q.eq(q.field("userId"), args.userId)))
        .first();

        if (!user) {
            console.error('user not found')
        }

        workspace.sharedUsers.push(args.userId);

        await ctx.db.patch(workspace._id, {
            creator: workspace.creator,
            name: workspace.name,
            sharedUsers: workspace.sharedUsers,
            chatHistory: workspace.chatHistory,
            noteblock: workspace.noteblock,
            bookmarks: workspace.bookmarks,
        })


        return workspace;
    }
})


export const removeUserFromWorkspace = mutation({
    args: { workspaceId: v.string(), userId: v.string() },
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

        workspace.sharedUsers = workspace.sharedUsers.filter((userId) => userId !== args.userId);

        const _workspace = await ctx.db.patch(workspace._id, {
            creator: workspace.creator,
            name: workspace.name,
            sharedUsers: workspace.sharedUsers,
            chatHistory: workspace.chatHistory,
            noteblock: workspace.noteblock,
            bookmarks: workspace.bookmarks,

        });

        return _workspace;
    },
})


export const getUsernamesByWorkspace = query({
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

        // Ensure sharedUsers is an array and not null/undefined.
        if (!Array.isArray(workspace.sharedUsers)) {
            return []; // Return an empty array if no shared users.
        }

        let rootUserData = await ctx.db 
        .query("user")
        .filter((q) => q.eq(q.field("_id"), workspace.creator))
        .first();

        workspace.sharedUsers.unshift(rootUserData?.userId || 'user_0');

        const userDataPromises = workspace.sharedUsers.map(userId =>
            ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("userId"), userId))
                .first()
        );

        const usersData = await Promise.all(userDataPromises);

        const userData = usersData.map(_userData => ({
            userId: _userData?.userId,
            name: _userData?.name,
            email: _userData?.email,
            pfpUrl: _userData?.pfpUrl,
            _id: _userData?._id
        })).filter(user => user.userId != null); // Filter out any undefined results due to missing users.

        return userData;
    }
});