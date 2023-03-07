import { ProductData, ProductFilter, ProductForm } from "@tm-wear/app/Product";
import { client } from "@tm-wear/utils";
import { BaseGetResponseType, BaseResponseType } from "../types/base";
import { objToQs } from "@fitzzz/utils";

export const getProductApi = async (filter: ProductFilter | null) => {
  const response = await client.get(`/product?${objToQs(filter!)}`);
  return response.data as BaseResponseType<BaseGetResponseType<ProductData>>;
};

export const getProductByIdApi = async (id: string | number) => {
  const response = await client.get(`/product/${id}`);
  return response.data as BaseResponseType<ProductData>;
};

export const postProductApi = async (request: Partial<ProductForm>) => {
  const response = await client.post(`/product`, request);
  return response.data as BaseResponseType;
};

export const putProductApi = async (request: Partial<ProductForm>) => {
  const response = await client.put(`/product`, request);
  return response.data as BaseResponseType;
};

export const deleteProductImageApi = async (id: string | number) => {
  const response = await client.delete(`/product-image/${id}`);
  return response.data as BaseResponseType;
};

export const deleteProductApi = async (id: string | number) => {
  const response = await client.delete(`/product/${id}`);
  return response.data as BaseResponseType;
};
