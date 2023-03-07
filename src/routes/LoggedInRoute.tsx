import ErrorPage from "@tm-wear/pages/ErrorPage";
import { useLayoutStore } from "@tm-wear/store";
import React from "react";
import { Outlet } from "react-router-dom";

interface LoggedInRouteProps {
  children?: React.ReactElement;
}

const LoggedInRoute = ({ children }: LoggedInRouteProps) => {
  const { errorPage } = useLayoutStore();
  if (errorPage > 0) {
    return <ErrorPage />;
  }
  return children ? children : <Outlet />;
};

export default LoggedInRoute;
