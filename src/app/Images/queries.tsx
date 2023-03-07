import { useMutation } from "@tanstack/react-query";
import { onUploadBulkApi } from "@tm-wear/api/services/images";
import { useLayoutStore } from "@tm-wear/store";
import { useToast } from "@tm-wear/utils";

export const useUploadImage = (callback: (res: any) => void) => {
  const { toggleLoader } = useLayoutStore();
  const { errorSnackbar, successSnackbar } = useToast();

  return useMutation({
    mutationFn: (request: FormData) =>
      onUploadBulkApi(request, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onMutate: toggleLoader,
    onSuccess: (res) => {
      callback(res);
      res.success
        ? successSnackbar("Successfully Upload Image(s)")
        : errorSnackbar("Failed upload image. Please try again later");
    },
    onError: (_) => {
      errorSnackbar("Failed upload image. Please try again later");
    },
    onSettled: toggleLoader,
  });
};
