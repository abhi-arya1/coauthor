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

        if (args.title === '') {
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


export const getWebpageById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const webpage = await ctx.db
            .query("webpage")
            .filter((q) => q.eq(q.field("_id"), args.id))
            .first();

        return webpage;
    }
})


export const getWebpagesByIds = query({
    args: { ids: v.array(v.id("webpage")) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("No Auth");
        }

        const webpages = await ctx.db
            .query("webpage")
            .collect();

        const _webpages = webpages.filter(webpage => args.ids.includes(webpage._id));

        return _webpages;
    }
})