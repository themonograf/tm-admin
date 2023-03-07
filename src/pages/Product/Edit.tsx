import React from "react";
import {
  Form,
  ProductForm,
  useGetProductById,
  usePutProduct,
} from "@tm-wear/app/Product";
import { Navigate, useParams } from "react-router-dom";
import { omit } from "lodash";

const ProductEdit = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetProductById(id || 0);
  const { mutate: onPutProduct } = usePutProduct();

  return error || !id ? (
    <Navigate to={"/product"} replace />
  ) : (
    <form>
      <div className="flex h-full flex-col p-8">
        <div className="flex flex-1 flex-col gap-4 rounded bg-white p-4 shadow-md">
          {!isFetching ? (
            <Form
              currentValue={
                data?.data
                  ? ({
                      ...omit(data.data, [
                        "updatedAt",
                        "createdAt",
                        "deletedAt",
                        "isSold",
                      ]),
                      prefix: data.data.name.split(" ")[0],
                      productImage: data.data.productImage.map((item) =>
                        omit(item, ["createdAt", "productId", "updatedAt"]),
                      ),
                    } as ProductForm)
                  : null
              }
              onSave={(form) => form && onPutProduct(form)}
            />
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default ProductEdit;
