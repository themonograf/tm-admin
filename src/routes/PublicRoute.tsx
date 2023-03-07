import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  isAllowed?: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const PublicRoute = ({
  isAllowed,
  redirectPath = "/dashboard",
  children,
}: PublicRouteProps) => {
  if (isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
