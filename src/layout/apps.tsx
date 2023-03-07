import React from "react";
import { FcAddImage, FcFrame } from "react-icons/fc";
import { MdOutlineCategory } from "react-icons/md";

type Apps = {
  category: string;
  app: {
    title: string;
    path: string;
    icon: React.ReactNode;
  }[];
}[];

const apps: Apps = [
  {
    category: "Apps",
    app: [
      {
        title: "Product",
        path: "/product",
        icon: <FcAddImage fontSize={"45px"} />,
      },
    ],
  },
  {
    category: "Manage",
    app: [
      {
        title: "Images",
        path: "/images",
        icon: <FcAddImage fontSize={"45px"} />,
      },
      {
        title: "Banner",
        path: "/banner",
        icon: <FcFrame fontSize={"45px"} />,
      },
      {
        title: "Category",
        path: "/category",
        icon: (
          <MdOutlineCategory className="text-green-700" fontSize={"45px"} />
        ),
      },
    ],
  },
];

export default apps;
