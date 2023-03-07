import React from "react";
import { Button } from "@tm-wear/core";
import { useLayoutStore, useUserStore } from "@tm-wear/store";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { errorPage, clearLayoutStore } = useLayoutStore();
  const { clearAll } = useUserStore();
  const navigate = useNavigate();

  const clearStorage = () => {
    clearLayoutStore();
    clearAll();
    localStorage.clear();
  };
  const logout = () => {
    clearStorage();
    navigate("/login", { replace: true });
  };
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center gap-6 bg-white">
      <img alt="" src={"/images/gui-expired-svgrepo-com.svg"} width="180px" />

      <div className="flex flex-col gap-4">
        <span className="text-2xl font-bold text-gray-900">
          {errorPage === 401 ? "Session Expired" : "Unknown Error"}
        </span>
        <span className="mb-2 text-[14px] text-gray-400">
          {errorPage === 401
            ? "You're logged out automatically due to session expired. Please re-login"
            : "The page is currently under maintenance, we'll get back to you ASAP."}
        </span>
        <div>
          <Button className="font-bold" onClick={logout}>
            {errorPage === 401 ? "Go to Login Page" : "Log Out"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
