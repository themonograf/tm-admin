import { useMutation } from "@tanstack/react-query";
import { fetchLoginApi } from "@tm-wear/api/services/auth";
import useUserStore from "@tm-wear/store/useUserStore";
import { useToast } from "@tm-wear/utils";
import { LoginForm } from "./types";

export const useLoginUser = () => {
  const { setUserData, setUserToken } = useUserStore();
  const { errorSnackbar } = useToast();

  return useMutation({
    mutationFn: (request: LoginForm) => fetchLoginApi(request),
    onSuccess: (res) => {
      setUserData(res);
      setUserToken(res.accessToken);
    },
    onError: (_) => {
      errorSnackbar("Failed Login. Please try again later");
    },
  });
};
