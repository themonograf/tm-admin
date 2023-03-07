import { BasePaging } from "@tm-wear/api/types/base";

export type ProductDataImage = {
  id?: number;
  isPrimary: boolean;
  productId?: number;
  image: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ProductData = {
  id: number;
  name: string;
  variant: string;
  description: string;
  productCategoryId: number;
  basicPrice: number;
  catalogPrice: number;
  olshopPrice: number;
  minLivePrice: number;
  slug: string;
  isSold: boolean;
  code?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  productImage: Omit<
    ProductDataImage,
    "productId" | "createdAt" | "updatedAt"
  >[];
};

export type ProductForm = {
  prefix: string;
} & Omit<
  ProductData,
  "isSold" | "code" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type ProductFilter = {
  keyword: string;
  is_sold: number;
} & Pick<BasePaging, "limit" | "page">;

export type ProductStoreState = {
  filter: ProductFilter;
};
export type ProductStoreAction = {
  setFilter: (filter: Partial<ProductFilter>) => void;
};
