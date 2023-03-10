import { z } from "zod";

export const ResellerDataSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().nonempty(),
    username: z.string().nonempty(),
    email: z.string().optional().nullable(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    phoneNumber: z.string().nonempty(),
    address: z.string().optional().nullable(),
    tokopedia: z.string().optional().nullable(),
    shopee: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    isAdmin: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.id && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    } else if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
    return z.NEVER;
  });

export type ResellerDataSchema = z.infer<typeof ResellerDataSchema>;
