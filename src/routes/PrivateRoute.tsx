import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAllowed?: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const PrivateRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}: PrivateRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
