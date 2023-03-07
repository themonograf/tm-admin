import React, { useState } from "react";
import { useGetMasterImage } from "@tm-wear/api/queries/master";
import { BiLoaderAlt } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Images = () => {
  const [category, setCategory] = useState<string>("product");
  const { data: imageList, isFetching } = useGetMasterImage(category);
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col p-8">
      <div className="flex flex-1 flex-col rounded bg-white shadow-md">
        <div className="sticky top-0 z-10 flex justify-end gap-4 bg-white p-4 shadow">
          <div>
            <select
              required
              id="productCategoryId"
              name="productCategoryId"
              autoComplete="productCategoryId"
              className="block rounded-md border-0 bg-white py-2.5 pr-8 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="product">Product</option>
              <option value="category">Category</option>
              <option value="banner">Banner</option>
            </select>
          </div>
          <button
            onClick={() => navigate("/images/tambah")}
            className="flex items-center rounded bg-blue-500 p-2 text-white hover:shadow-lg"
          >
            <BsPlus fontSize={"19px"} />
            Tambah Gambar
          </button>
        </div>
        {isFetching ? (
          <div className="flex h-full items-center justify-center">
            <span className="animate-spin">
              <BiLoaderAlt size={36} />
            </span>
          </div>
        ) : null}
        {!isFetching && !imageList?.data?.length ? (
          <div className="flex h-full items-center justify-center">
            <img src="/images/no-data.svg" width={320} alt="" />
          </div>
        ) : null}
        <div className="grid w-full flex-1 grid-cols-6 gap-6 overflow-auto p-4">
          {imageList?.data.map((item) => (
            <div key={item.value} className="relative">
              <img
                aria-hidden
                className={`cursor-pointer rounded-md`}
                src={item.key}
                width={"100%"}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;
