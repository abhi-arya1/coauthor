import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    workspace: defineTable({
        creatorID: v.number(),
        userIDs: v.array(v.number()),
        chatHistory: v.array(v.string()),
        webpages: v.optional(v.string()),
        noteblock: v.optional(v.string()), 
    }),

    webpage: defineTable({
        url: v.string(),
        title: v.string(),
        descriptionHoverMetaData: v.string(), 
    }),

    user: defineTable({
        userID: v.number(), 
        pfpURL: v.string(), 
        email: v.string(), 
        name: v.string(), 
        targetEmails: v.array(v.string()),
    })
    .index("byTargetEmails", ["targetEmails"])
});