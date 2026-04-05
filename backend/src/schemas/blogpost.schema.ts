import { z } from "zod";

export const createBlogPostSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3),
    description: z.string(),
    details: z.string(),
    tags: z.array(z.string()),
    coverImage: z.string(),
    readTime: z.number(),
    authorId: z.string(),
    isPublished: z.boolean(),
    category: z.enum(["dotnet", "unity", "web", "general", "tutorial", "opinion"]),
});

export const updateBlogPostSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    slug: z.string().min(3).optional(),
    description: z.string().optional(),
    details: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    readTime: z.number().optional(),
    authorId: z.string().optional(),
    isPublished: z.boolean().optional(),
    category: z.enum(["dotnet", "unity", "web", "general", "tutorial", "opinion"]).optional(),
});