import { z } from "zod";

const personalDevelopmentCategorySchema = z.enum(["course", "self-study", "workshop", "other"]);

const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  description: z.string().optional(),
  isFinished: z.boolean(),
  hours: z.number().nonnegative().optional(),
});

export const createPersonalDevelopmentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  provider: z.string().min(2, "Provider must be at least 2 characters long"),
  description: z.string(),
  tags: z.array(z.string()),
  icon: z.string(),
  modules: z.array(moduleSchema),
  certificateLink: z.string().url().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  category: personalDevelopmentCategorySchema,
});

export const updatePersonalDevelopmentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  provider: z.string().min(2, "Provider must be at least 2 characters long").optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  icon: z.string().optional(),
  modules: z.array(moduleSchema).optional(),
  certificateLink: z.string().url().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  category: personalDevelopmentCategorySchema.optional(),
});
