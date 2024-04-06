import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        userId: v.number(), 
        pfpUrl: v.string(), 
        email: v.string(), 
        name: v.string(),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity(); 

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        // const userId = identity.subject; 

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