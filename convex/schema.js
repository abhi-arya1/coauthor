"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    workspaces: (0, server_1.defineTable)({
        creatorID: values_1.v.number(),
        userIDs: values_1.v.array(values_1.v.number()),
        chatHistory: values_1.v.array(values_1.v.string()),
        webpages: values_1.v.optional(values_1.v.string()),
        noteblock: values_1.v.optional(values_1.v.string()),
    }),
    webpages: (0, server_1.defineTable)({
        url: values_1.v.string(),
        title: values_1.v.string(),
        descriptionHoverMetaData: values_1.v.string(),
    }),
    users: (0, server_1.defineTable)({
        userID: values_1.v.number(),
        pfpURL: values_1.v.string(),
        email: values_1.v.string(),
        name: values_1.v.string(),
        targetEmails: values_1.v.array(values_1.v.string()),
    })
        .index("byTargetEmails", ["targetEmails"])
});
