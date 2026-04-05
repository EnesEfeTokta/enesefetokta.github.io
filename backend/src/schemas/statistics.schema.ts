import { z } from "zod";

const socialMetricsSchema = z.object({
  linkedIn: z.object({
    followers: z.number().nonnegative(),
    connections: z.number().nonnegative(),
  }),
  medium: z.object({
    views: z.number().nonnegative(),
    followers: z.number().nonnegative(),
  }),
  youtube: z.object({
    subscribers: z.number().nonnegative(),
    views: z.number().nonnegative(),
  }),
});

const universityMetricsSchema = z.object({
  gpa: z.number().min(0).max(4),
});

export const createStatisticsSchema = z.object({
  socialMetrics: socialMetricsSchema,
  universityMetrics: universityMetricsSchema,
});

export const updateStatisticsSchema = z.object({
  socialMetrics: socialMetricsSchema.optional(),
  universityMetrics: universityMetricsSchema.optional(),
});
