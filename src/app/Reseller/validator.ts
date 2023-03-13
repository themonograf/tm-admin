import { z } from "zod";

export const ResellerDataSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().nonempty(),
    username: z.string().nonempty(),
    email: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    phoneNumber: z.string().nonempty(),
    address: z.string().optional(),
    tokopedia: z.string().optional(),
    shopee: z.string().optional(),
    instagram: z.string().optional(),
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
