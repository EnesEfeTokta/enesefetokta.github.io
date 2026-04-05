import { z } from 'zod';

export const createProjectSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3),
    description: z.string(),
    details: z.string(),
    tags: z.array(z.string()),
    icon: z.string(),
    image: z.string().optional(),
    githubLink: z.string().optional(),
    liveLink: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    isFeatured: z.boolean().optional(),
    category: z.enum(["dotnet", "unity", "web", "mobile"]),
});

export const updateProjectSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    slug: z.string().min(3).optional(),
    description: z.string().optional(),
    details: z.string().optional(),
    tags: z.array(z.string()).optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    githubLink: z.string().optional(),
    liveLink: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isFeatured: z.boolean().optional(),
    category: z.enum(["dotnet", "unity", "web", "mobile"]).optional(),
});