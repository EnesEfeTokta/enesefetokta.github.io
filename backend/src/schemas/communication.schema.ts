import { z } from "zod";

export const createCommunicationSchema = z.object({
  senderEmail: z.string(),
  senderName: z.string().min(2, "Sender name is required").max(100),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Subject is required")
});