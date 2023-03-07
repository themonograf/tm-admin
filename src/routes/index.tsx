import React from "react";

const Dashboard = React.lazy(() => import("@tm-wear/pages/Dahboard"));
const Product = React.lazy(() => import("@tm-wear/pages/Product"));
const ProductNew = React.lazy(() => import("@tm-wear/pages/Product/New"));
const ProductEdit = React.lazy(() => import("@tm-wear/pages/Product/Edit"));
const Images = React.lazy(() => import("@tm-wear/pages/Images"));
const ImagesNew = React.lazy(() => import("@tm-wear/pages/Images/New"));
const Banner = React.lazy(() => import("@tm-wear/pages/Banner"));
const BannerNew = React.lazy(() => import("@tm-wear/pages/Banner/New"));
const Category = React.lazy(() => import("@tm-wear/pages/Category"));
const CategoryNew = React.lazy(() => import("@tm-wear/pages/Category/New"));

export type RoutesType = {
  path: string;
  component: React.ReactNode;
  title?: string;
  children?: RoutesType[];
};

const routes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
    title: "Dashboard",
  },
  {
    path: "/product",
    component: <Product />,
    title: "Product",
    children: [
      {
        path: "/tambah",
        component: <ProductNew />,
        title: "Tambahkan Product",
      },
      {
        path: "/edit/:id",
        component: <ProductEdit />,
        title: "Edit Product",
      },
    ],
  },
  {
    path: "/images",
    component: <Images />,
    title: "Manajemen Gambar",
    children: [
      {
        path: "/tambah",
        component: <ImagesNew />,
        title: "Tambahkan Gambar",
      },
    ],
  },
  {
    path: "/banner",
    component: <Banner />,
    title: "Manajemen Banner",
    children: [
      {
        path: "/tambah",
        component: <BannerNew />,
        title: "Tambahkan Banner",
      },
    ],
  },
  {
    path: "/banner",
    component: <Category />,
    title: "Manajemen Kategori",
    children: [
      {
        path: "/tambah",
        component: <CategoryNew />,
        title: "Tambahkan Kategori",
      },
    ],
  },
];

export default routes;
