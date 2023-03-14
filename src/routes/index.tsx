import React from "react";

const Dashboard = React.lazy(() => import("@tm-wear/pages/Dahboard"));
const Product = React.lazy(() => import("@tm-wear/pages/Product"));
const ProductNew = React.lazy(() => import("@tm-wear/pages/Product/New"));
const ProductEdit = React.lazy(() => import("@tm-wear/pages/Product/Edit"));
const Reseller = React.lazy(() => import("@tm-wear/pages/Reseller"));
const ResellerNew = React.lazy(() => import("@tm-wear/pages/Reseller/New"));
const ResellerEdit = React.lazy(() => import("@tm-wear/pages/Reseller/Edit"));
const Images = React.lazy(() => import("@tm-wear/pages/Images"));
const ImagesNew = React.lazy(() => import("@tm-wear/pages/Images/New"));
const Banner = React.lazy(() => import("@tm-wear/pages/Banner"));
const BannerNew = React.lazy(() => import("@tm-wear/pages/Banner/New"));
const Category = React.lazy(() => import("@tm-wear/pages/Category"));
const CategoryNew = React.lazy(() => import("@tm-wear/pages/Category/New"));
const CategoryEdit = React.lazy(() => import("@tm-wear/pages/Category/Edit"));

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
    path: "/reseller",
    component: <Reseller />,
    title: "Reseller",
    children: [
      {
        path: "/tambah",
        component: <ResellerNew />,
        title: "Tambahkan Reseller",
      },
      {
        path: "/edit/:id",
        component: <ResellerEdit />,
        title: "Edit Reseller",
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
    path: "/category",
    component: <Category />,
    title: "Manajemen Kategori",
    children: [
      {
        path: "/tambah",
        component: <CategoryNew />,
        title: "Tambahkan Kategori",
      },
      {
        path: "/edit/:id",
        component: <CategoryEdit />,
        title: "Edit Kategory",
      },
    ],
  },
];

export default routes;
