// import { ImageNewForm } from "@tm-wear/app/Images";
import { client } from "@tm-wear/utils";
import { AxiosRequestConfig } from "axios";

export const onUploadBulkApi = async (
  request: FormData,
  config?: AxiosRequestConfig,
) => {
  const response = await client.post("/upload/bulk", request, config);
  return response.data as any;
};
