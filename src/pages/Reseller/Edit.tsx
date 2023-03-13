import React from "react";
import {
  Form,
  useGetResellerById,
  usePutReseller,
} from "@tm-wear/app/Reseller";
import { Navigate, useParams } from "react-router-dom";

const ResellerEdit = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetResellerById(id || 0);
  const { mutate: onPutReseller } = usePutReseller();

  return error || !id ? (
    <Navigate to={"/product"} replace />
  ) : (
    <div className="flex h-full flex-col p-8">
      <div className="flex flex-1 flex-col gap-4 rounded bg-white p-4 shadow-md">
        {!isFetching ? (
          <Form
            currentValue={data?.data}
            onSave={(form) => form && onPutReseller(form)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ResellerEdit;
