import { BasePaging } from "@tm-wear/api/types/base";

export type CategoryFilter = {
  keyword: string;
} & Pick<BasePaging, "limit" | "page">;

export type CategoryState = {
  filter: CategoryFilter;
};
export type CategoryAction = {
  setFilter: (filter: Partial<CategoryFilter>) => void;
};
