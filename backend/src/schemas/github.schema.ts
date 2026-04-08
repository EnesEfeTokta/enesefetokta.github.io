import { z } from "zod";

export const syncGitHubSchema = z.object({
  username: z.string().min(1).optional(),
  perPage: z.number().int().min(1).max(100).optional(),
});

export const githubHistoryQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 10))
    .refine((value) => Number.isInteger(value) && value >= 1 && value <= 100, {
      message: "limit must be an integer between 1 and 100",
    }),
});

export const githubTrendQuerySchema = z.object({
  window: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 20))
    .refine((value) => Number.isInteger(value) && value >= 2 && value <= 365, {
      message: "window must be an integer between 2 and 365",
    }),
});
