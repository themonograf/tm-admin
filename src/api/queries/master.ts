import { useQuery } from "@tanstack/react-query";
import { getMasterCategoryApi, getMasterImageApi } from "../services/master";

export const useGetMasterImage = (category: string) =>
  useQuery(["master-image", category], () => getMasterImageApi(category));

export const useGetMasterCategory = () =>
  useQuery(["product-category/select-box"], getMasterCategoryApi);
