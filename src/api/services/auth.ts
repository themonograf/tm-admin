import { LoginForm } from "@tm-wear/app/Login";
import { client } from "@tm-wear/utils";
import { AxiosRequestConfig } from "axios";
import { User } from "../types/auth";

export const fetchLoginApi = async (
  data: LoginForm,
  config?: AxiosRequestConfig,
) => {
  const response = await client.post("/auth/login", data, config);
  return response.data as User;
};
