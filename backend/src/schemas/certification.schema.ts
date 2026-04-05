import { z } from "zod";

const certificationCategorySchema = z.enum(["professional", "academic", "other"]);

export const createCertificationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  issuer: z.string().min(2, "Issuer must be at least 2 characters long"),
  description: z.string(),
  issueDate: z.string(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  link: z.string().url(),
  icon: z.string(),
  category: certificationCategorySchema,
});

export const updateCertificationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  issuer: z.string().min(2, "Issuer must be at least 2 characters long").optional(),
  description: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  link: z.string().url().optional(),
  icon: z.string().optional(),
  category: certificationCategorySchema.optional(),
});
