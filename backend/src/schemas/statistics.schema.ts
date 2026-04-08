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
 
const contentMetricsSchema = z.object({
  totalBlogPosts: z.number().nonnegative(),
  totalProjects: z.number().nonnegative(),
  featuredProjects: z.number().nonnegative(),
  totalExperiences: z.number().nonnegative(),
  totalCertifications: z.number().nonnegative(),
  totalPersonalDevelopments: z.number().nonnegative(),
});

const githubMetricsSchema = z.object({
  totalRepositories: z.number().nonnegative(),
  totalCommits: z.number().nonnegative(),
  totalPullRequests: z.number().nonnegative(),
  totalStars: z.number().nonnegative(),
  followersCount: z.number().nonnegative(),
  openIssuesCount: z.number().nonnegative(),
  closedIssuesCount: z.number().nonnegative(),
  codeReviewsCount: z.number().nonnegative(),
  languageDensity: z.record(z.string(), z.number()).optional(),
});

export const createStatisticsSchema = z.object({
  socialMetrics: socialMetricsSchema,
  universityMetrics: universityMetricsSchema,
  contentMetrics: contentMetricsSchema.optional(),
  githubMetrics: githubMetricsSchema.optional(),
});

export const updateStatisticsSchema = z.object({
  socialMetrics: socialMetricsSchema.optional(),
  universityMetrics: universityMetricsSchema.optional(),
  contentMetrics: contentMetricsSchema.optional(),
  githubMetrics: githubMetricsSchema.optional(),
});
