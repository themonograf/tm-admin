import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      cacheTime: 0,
    },
  },
});

function Providers({ children }: Props) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default Providers;
