import { client } from "@tm-wear/utils";
import { BaseGetResponseType, BaseResponseType } from "../types/base";
import { objToQs } from "@fitzzz/utils";

export const getResellerApi = async <F = null, D = null>(filter: F | null) => {
  const response = await client.get(`/reseller?${objToQs(filter!)}`);
  return response.data as BaseResponseType<BaseGetResponseType<D>>;
};

export const getResellerByIdApi = async <D = unknown>(id: string | number) => {
  const response = await client.get(`/reseller/${id}`);
  return response.data as BaseResponseType<D>;
};

export const postResellerApi = async <T = null>(request: T | null) => {
  const response = await client.post(`/reseller`, request);
  return response.data as BaseResponseType;
};

export const putResellerApi = async <T = null>(request: T | null) => {
  const response = await client.put(`/reseller`, request);
  return response.data as BaseResponseType;
};

export const deleteResellerApi = async (id: string | number) => {
  const response = await client.delete(`/reseller/${id}`);
  return response.data as BaseResponseType;
};
