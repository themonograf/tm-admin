export type BasePaging = {
  page: number;
  limit: number;
  sortby: string;
  order: "" | "asc" | "desc";
};

export type BaseGetResponseType<T> = {
  total: number;
  data: T[];
};

export type BaseResponseType<T = null> = {
  success: boolean;
  data: T;
};
