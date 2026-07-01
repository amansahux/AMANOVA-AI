import { z } from "zod";

export const registerValidator = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    googleId: z.string().optional(),
});

export const loginValidator = z.object({
    email: z.string().email("Invalid email address").optional(),
    username: z.string().min(1, "Username is required").optional(),
    password: z.string().min(1, "Password is required"),
    googleId: z.string().optional(),
});
