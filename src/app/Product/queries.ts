import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductApi,
  deleteProductImageApi,
  getProductApi,
  getProductByIdApi,
  postProductApi,
  putProductApi,
} from "@tm-wear/api/services/products";
import { useLayoutStore } from "@tm-wear/store";
import { useToast } from "@tm-wear/utils";
import { useNavigate } from "react-router-dom";
import { ProductFilter, ProductForm } from "./types";

export const useGetProduct = (filter: ProductFilter | null) =>
  useQuery(["product", filter], () => getProductApi(filter), {
    enabled: !!filter,
  });

export const useGetProductById = (id: string | number) =>
  useQuery([`product/${id}`], () => getProductByIdApi(id), {
    enabled: !!id,
  });

export const usePostProduct = () => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: Partial<ProductForm>) => postProductApi(form),
    onMutate: toggleLoader,
    onSuccess: () => {
      navigate("/product");
      successSnackbar("Successfully saved data");
    },
    onError: (_) => {
      errorSnackbar("Failed save data");
    },
    onSettled: toggleLoader,
  });
};

export const usePutProduct = () => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: Partial<ProductForm>) => putProductApi(form),
    onMutate: toggleLoader,
    onSuccess: () => {
      navigate("/product");
      successSnackbar("Successfully saved data");
    },
    onError: (_) => {
      errorSnackbar("Failed save data");
    },
    onSettled: toggleLoader,
  });
};

export const useRemoveProductImage = (
  callback: (res: { success: boolean; id?: string | number }) => void,
) => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number | string) => deleteProductImageApi(id),
    onMutate: toggleLoader,
    onSuccess: (_, variables) => {
      successSnackbar("Successfully removed picture data");
      queryClient.invalidateQueries(["master-image", "product"]);
      callback({ success: true, id: variables });
    },
    onError: (_) => {
      errorSnackbar("Failed remove picture");
      callback({ success: false });
    },
    onSettled: toggleLoader,
  });
};

export const useRemoveProduct = (
  callback: (res: { success: boolean; id?: string | number }) => void,
) => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();

  return useMutation({
    mutationFn: (id: string | number | string) => deleteProductApi(id),
    onMutate: toggleLoader,
    onSuccess: (_, variables) => {
      successSnackbar("Successfully removed product");
      callback({ success: true, id: variables });
    },
    onError: (_) => {
      errorSnackbar("Failed remove product");
      callback({ success: false });
    },
    onSettled: toggleLoader,
  });
};
