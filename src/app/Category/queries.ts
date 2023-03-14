import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteCategoryApi,
  getCategoryApi,
  getCategoryByIdApi,
  postCategoryApi,
  putCategoryApi,
} from "@tm-wear/api/services/category";
import { useLayoutStore } from "@tm-wear/store";
import { useToast } from "@tm-wear/utils";
import { useNavigate } from "react-router-dom";
import { CategoryFilter } from "./types";
import { CategoryDataSchema } from "./validator";

export const useGetCategory = (filter: CategoryFilter | null) =>
  useQuery(["category", filter], () => getCategoryApi<CategoryFilter>(filter), {
    enabled: !!filter,
  });

export const useGetCategoryById = (id: string | number) =>
  useQuery(
    [`category/${id}`],
    () => getCategoryByIdApi<CategoryDataSchema>(id),
    {
      enabled: !!id,
    },
  );

export const usePostCategory = () => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: CategoryDataSchema) =>
      postCategoryApi<CategoryDataSchema>(form),
    onMutate: toggleLoader,
    onSuccess: () => {
      navigate("/category");
      successSnackbar("Successfully saved data");
    },
    onError: (_) => {
      errorSnackbar("Failed save data");
    },
    onSettled: toggleLoader,
  });
};

export const usePutCategory = () => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: CategoryDataSchema) =>
      putCategoryApi<CategoryDataSchema>(form),
    onMutate: toggleLoader,
    onSuccess: () => {
      navigate("/category");
      successSnackbar("Successfully saved data");
    },
    onError: (_) => {
      errorSnackbar("Failed save data");
    },
    onSettled: toggleLoader,
  });
};

export const useRemoveCategory = (
  callback: (res: { success: boolean; id?: string | number }) => void,
) => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();

  return useMutation({
    mutationFn: (id: string | number | string) => deleteCategoryApi(id),
    onMutate: toggleLoader,
    onSuccess: (_, variables) => {
      successSnackbar("Successfully removed category");
      callback({ success: true, id: variables });
    },
    onError: (_) => {
      errorSnackbar("Failed remove category");
      callback({ success: false });
    },
    onSettled: toggleLoader,
  });
};
