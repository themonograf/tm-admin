import { client } from "@tm-wear/utils";
import { BaseGetResponseType, BaseResponseType } from "../types/base";
import { objToQs } from "@fitzzz/utils";

export const getCategoryApi = async <F = null, D = null>(filter: F | null) => {
  const response = await client.get(`/product-category?${objToQs(filter!)}`);
  return response.data as BaseResponseType<BaseGetResponseType<D>>;
};

export const getCategoryByIdApi = async <D = unknown>(id: string | number) => {
  const response = await client.get(`/product-category/${id}`);
  return response.data as BaseResponseType<D>;
};

export const postCategoryApi = async <T = null>(request: T | null) => {
  const response = await client.post(`/product-category`, request);
  return response.data as BaseResponseType;
};

export const putCategoryApi = async <T = null>(request: T | null) => {
  const response = await client.put(`/product-category`, request);
  return response.data as BaseResponseType;
};

export const deleteCategoryApi = async (id: string | number) => {
  const response = await client.delete(`/product-category/${id}`);
  return response.data as BaseResponseType;
};
