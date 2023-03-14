import { z } from "zod";

export const BasePaging = z.object({
  page: z.number(),
  limit: z.number(),
  sortby: z.string(),
  order: z.union([z.literal(""), z.literal("asc"), z.literal("desc")]),
});

export type BasePaging = z.infer<typeof BasePaging>;

export type BaseGetResponseType<T> = {
  total: number;
  data: T[];
};

export type BaseResponseType<T = null> = {
  success: boolean;
  data: T;
};
