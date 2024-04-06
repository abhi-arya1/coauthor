import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    workspace: defineTable({
        creator: v.id("user"),
        name: v.string(), 
        sharedUsers: v.array(v.id("user")),
        chatHistory: v.array(v.array(v.string())),
        webpages: v.optional(v.string()),
        noteblock: v.optional(v.string()), 
        bookmarks: v.optional(v.array(v.id("webpage")))
    }),

    webpage: defineTable({
        url: v.string(),
        title: v.string(),
        description: v.string(),
        imageUrl: v.string(),
        firstContent: v.string(), 
    })
    .index("byUrl", ["url"]),

    user: defineTable({
        userId: v.string(),
        pfpUrl: v.string(), 
        email: v.string(), 
        name: v.string(), 
    })
    .index("byUserId", ["userId"])
    .index("byEmail", ["email"])
    .index("byName", ["name"])

});