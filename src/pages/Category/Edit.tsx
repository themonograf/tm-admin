import React from "react";
import {
  Form,
  useGetCategoryById,
  usePutCategory,
} from "@tm-wear/app/Category";
import { Navigate, useParams } from "react-router-dom";

const CategoryEdit = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetCategoryById(id || 0);
  const { mutate: onPutCategory } = usePutCategory();

  return error || !id ? (
    <Navigate to={"/category"} replace />
  ) : (
    <div className="flex h-full flex-col p-8">
      <div className="flex flex-1 flex-col gap-4 rounded bg-white p-4 shadow-md">
        {!isFetching ? (
          <Form
            currentValue={data?.data}
            onSave={(form) => form && onPutCategory(form)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CategoryEdit;
