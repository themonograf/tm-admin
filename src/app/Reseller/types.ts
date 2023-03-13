import { BasePaging } from "@tm-wear/api/types/base";

export type ResellerTypes = {
  id?: number;
  name: string;
  username: string;
  email: string | null;
  password: string;
  phoneNumber: string | null;
  address: string | null;
  tokopedia: string | null;
  shopee: string | null;
  instagram: string | null;
  isAdmin: boolean;
};

export type ResellerFilter = {
  keyword: string;
} & Pick<BasePaging, "limit" | "page">;

export type ResellerState = {
  filter: ResellerFilter;
};
export type ResellerAction = {
  setFilter: (filter: Partial<ResellerFilter>) => void;
};
