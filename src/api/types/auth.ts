import { z } from "zod";

export const userDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
});

export type UserData = z.infer<typeof userDataSchema>;

export const userSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.number(),
  refreshToken: z.string(),
  success: z.boolean(),
  data: userDataSchema,
});

export type User = z.infer<typeof userSchema>;
