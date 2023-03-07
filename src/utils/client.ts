import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import useUserStore from "@tm-wear/store/useUserStore";
import { useLayoutStore } from "@tm-wear/store";

const instance = axios.create({
  baseURL: "https://thrift-api.themonograf.com/api",
});

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { userToken } = useUserStore.getState();

  if (userToken) {
    config.headers!.Authorization = `Bearer ${userToken}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (
  error: AxiosError<{ error: { statusCode: number; message: string } }>,
): Promise<AxiosError> => {
  const { setErrorPage } = useLayoutStore.getState();
  if (error.response?.status === 401) {
    setErrorPage(error.response?.status);
  }
  return error.response
    ? Promise.reject(error)
    : Promise.reject({ response: error.toJSON() });
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
