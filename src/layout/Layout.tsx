import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes, { RoutesType } from "@tm-wear/routes";
import AppHeader from "./AppHeader";
import { Box } from "@tm-wear/core";
import { ToastContainer } from "react-toastify";

import styles from "./Layout.module.scss";
import LoggedInRoute from "@tm-wear/routes/LoggedInRoute";

function Layout() {
  return (
    <>
      <Box className={styles.root}>
        <Box className={styles.content}>
          <AppHeader />
          <div className="block w-full flex-1 overflow-auto">
            <Routes>
              {routes.map(({ component, path, children }: RoutesType) => (
                <Route key={path} path={path} element={<LoggedInRoute />}>
                  <Route
                    index
                    element={
                      <React.Suspense fallback={<></>}>
                        {component}
                      </React.Suspense>
                    }
                  />
                  {children?.map((item) => (
                    <Route
                      key={item.path}
                      path={`${path}/${item.path}`}
                      element={
                        <React.Suspense fallback={<></>}>
                          {item.component}
                        </React.Suspense>
                      }
                    />
                  ))}
                </Route>
              ))}
              <Route
                path="*"
                element={<Navigate to={"/dashboard"} replace />}
              />
            </Routes>
          </div>
        </Box>
      </Box>

      <ToastContainer
        position="top-right"
        closeButton={false}
        pauseOnFocusLoss={false}
        hideProgressBar
      />
    </>
  );
}

export default Layout;
