import { z } from "zod";

export const createExperienceSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    company: z.string().min(2, "Company name must be at least 2 characters long"),
    location: z.string().min(2, "Location must be at least 2 characters long"),
    employmentType: z.enum(["full-time", "part-time", "freelance", "internship"]),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    details: z.string(),
    tags: z.array(z.string()),
    icon: z.string(),
    link: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    category: z.enum(["work", "education", "volunteer"]),
});

export const updateExperienceSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    company: z.string().min(2, "Company name must be at least 2 characters long").optional(),
    location: z.string().min(2, "Location must be at least 2 characters long").optional(),
    employmentType: z.enum(["full-time", "part-time", "freelance", "internship"]).optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
    details: z.string().optional(),
    tags: z.array(z.string()).optional(),
    icon: z.string().optional(),
    link: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    category: z.enum(["work", "education", "volunteer"]).optional(),
});