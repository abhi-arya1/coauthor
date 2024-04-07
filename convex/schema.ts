import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    workspace: defineTable({
        creator: v.id("user"),
        name: v.string(), 
        sharedUsers: v.array(v.string()),
        chatHistory: v.optional(v.any()),
        noteblock: v.optional(v.string()), 
        bookmarks: v.optional(v.array(v.id("webpage")))
    }),

    webpage: defineTable({
        url: v.string(),
        title: v.string(),
        abstract: v.string(),
        authors: v.string(),
        date: v.string(), 
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