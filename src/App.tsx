import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Login from "./pages/Login";
import Layout from "./layout/Layout";

import useUserStore from "./store/useUserStore";
import { GlobalLoader } from "./core";

function App() {
  const { userData } = useUserStore();

  return (
    <>
      <Routes>
        <Route path="login" element={<PublicRoute isAllowed={!!userData} />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/*" element={<PrivateRoute isAllowed={!!userData} />}>
          <Route path="*" element={<Layout />} />
        </Route>
        <Route path="*" element={<Navigate to={"/dashboard"} replace />} />
      </Routes>
      <GlobalLoader />
    </>
  );
}

export default App;
