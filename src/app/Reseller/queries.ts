import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteResellerApi,
  getResellerApi,
  getResellerByIdApi,
  postResellerApi,
  putResellerApi,
} from "@tm-wear/api/services/reseller";
import { useLayoutStore } from "@tm-wear/store";
import { useToast } from "@tm-wear/utils";
import { useNavigate } from "react-router-dom";
import { ResellerFilter } from "./types";
import { ResellerDataSchema } from "./validator";

export const useGetReseller = (filter: ResellerFilter | null) =>
  useQuery(["reseller", filter], () => getResellerApi<ResellerFilter>(filter), {
    enabled: !!filter,
  });

export const useGetResellerById = (id: string | number) =>
  useQuery(
    [`reseller/${id}`],
    () => getResellerByIdApi<ResellerDataSchema>(id),
    {
      enabled: !!id,
    },
  );

export const usePostReseller = () => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: ResellerDataSchema) =>
      postResellerApi<ResellerDataSchema>(form),
    onMutate: toggleLoader,
    onSuccess: () => {
      navigate("/reseller");
      successSnackbar("Successfully saved data");
    },
    onError: (_) => {
      errorSnackbar("Failed save data");
    },
    onSettled: toggleLoader,
  });
};

export const usePutReseller = () => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (form: ResellerDataSchema) =>
      putResellerApi<ResellerDataSchema>(form),
    onMutate: toggleLoader,
    onSuccess: () => {
      navigate("/reseller");
      successSnackbar("Successfully saved data");
    },
    onError: (_) => {
      errorSnackbar("Failed save data");
    },
    onSettled: toggleLoader,
  });
};

export const useRemoveReseller = (
  callback: (res: { success: boolean; id?: string | number }) => void,
) => {
  const { successSnackbar, errorSnackbar } = useToast();
  const { toggleLoader } = useLayoutStore();

  return useMutation({
    mutationFn: (id: string | number | string) => deleteResellerApi(id),
    onMutate: toggleLoader,
    onSuccess: (_, variables) => {
      successSnackbar("Successfully removed reseller");
      callback({ success: true, id: variables });
    },
    onError: (_) => {
      errorSnackbar("Failed remove reseller");
      callback({ success: false });
    },
    onSettled: toggleLoader,
  });
};
