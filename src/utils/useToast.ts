import { toast, ToastOptions } from "react-toastify";

const useToast = () => {
  const successSnackbar = (message: string, options?: ToastOptions) =>
    toast.success(message, options);

  const errorSnackbar = (message: string, options?: ToastOptions) =>
    toast.error(message, options);

  const warningSnackbar = (message: string, options?: ToastOptions) =>
    toast.warn(message, options);

  const infoSnackbar = (message: string, options?: ToastOptions) =>
    toast.info(message, options);

  return { successSnackbar, errorSnackbar, warningSnackbar, infoSnackbar };
};

export default useToast;
