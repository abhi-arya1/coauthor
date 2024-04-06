import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        userId: v.string(), 
        pfpUrl: v.string(), 
        email: v.string(), 
        name: v.string(),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const existingUser = await context.db
        .query("user")
        .filter(q => q.eq(q.field("userId"), args.userId))
        .first();  

        if (existingUser) { 
            console.log("User already exists");
            return null; 
        }

        const document = await context.db.insert("user",
        {
            userId: args.userId, 
            pfpUrl: args.pfpUrl,
            email: args.email,
            name: args.name 
        });

        return document; 
    }
})


export const getUserById = query({
    args: { convexId: v.id("user") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("_id"), args.convexId))
        .first();

        let userData;
        
        if (user?.userId === undefined) {
            return undefined; 
        } else { 
            userData = {
                userId: user.userId,
                pfpUrl: user.pfpUrl,
                email: user.email,
                name: user.name
            }
        }
        return userData;
    }
});


export const getByUserId = query({
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

        let userData;
        
        if (user?.userId === undefined) {
            return undefined; 
        } else { 
            userData = {
                userId: user.userId,
                pfpUrl: user.pfpUrl,
                email: user.email,
                name: user.name
            }
        }
        return userData;
    }
});


export const getByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("email"), args.email))
        .first();

        
        const userData = {
            userId: user?.userId,
            pfpUrl: user?.pfpUrl,
            email: user?.email,
            name: user?.name
        }
        return userData;
    }
})