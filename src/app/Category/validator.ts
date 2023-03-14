import { z } from "zod";

export const CategoryDataSchema = z.object({
  id: z.number().optional(),
  category: z.string().nonempty(),
  image: z.string().nullish().optional(),
  createdAt: z.string().nullish().optional(),
  updatedAt: z.string().nullish().optional(),
  deletedAt: z.string().nullish().optional(),
});

export type CategoryDataSchema = z.infer<typeof CategoryDataSchema>;
