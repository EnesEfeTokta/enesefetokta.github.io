import { z } from "zod";

const userRoleSchema = z.enum(["admin", "editor"]);

export const createUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  passwordHash: z.string().min(8, "Password hash must be at least 8 characters long"),
  role: userRoleSchema,
  avatar: z.string().url().optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  passwordHash: z.string().min(8, "Password hash must be at least 8 characters long").optional(),
  role: userRoleSchema.optional(),
  avatar: z.string().url().optional(),
});
