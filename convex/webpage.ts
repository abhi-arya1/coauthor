import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createWebpage = mutation({
    args: {
        url: v.string(),
        title: v.string(),
        abstract: v.string(),
        authors: v.string(),
        date: v.string(),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not Authenticated");
        }

        const existingWebpage = await context.db
            .query("webpage")
            .filter(q => q.eq(q.field("url"), args.url))
            .first();

        if (existingWebpage) {
            return null;
        }

        const document = await context.db.insert("webpage",
            {
                url: args.url,
                title: args.title,
                abstract: args.abstract,
                authors: args.authors,
                date: args.date
            });

        return document;
    }
})