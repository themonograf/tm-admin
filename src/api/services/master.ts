import { client } from "@tm-wear/utils";
import { BaseResponseType } from "../types/base";
import { MasterImageTypes, MasterCategoryTypes } from "../types/master";

export const getMasterImageApi = async (category: string) => {
  const response = await client.get(`/master-image/${category}`);
  return response.data as BaseResponseType<MasterImageTypes[]>;
};

export const getMasterCategoryApi = async () => {
  const response = await client.get(`/product-category/select-box`);
  return response.data as BaseResponseType<MasterCategoryTypes[]>;
};
