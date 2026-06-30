import * as z from "zod"

export const ChatValidator = z.object({
    content: z.string({
        required_error: "Content is required",
        invalid_type_error: "Content must be a string",
    }),
    chatId: z.string({
        required_error: "Chat ID is required",
        invalid_type_error: "Chat ID must be a string",
    }).optional(),
}).strict();
