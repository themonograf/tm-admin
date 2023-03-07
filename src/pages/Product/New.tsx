import React from "react";
import { Form, usePostProduct } from "@tm-wear/app/Product";

const ProductNew = () => {
  const { mutate: onPostProduct } = usePostProduct();
  return (
    <form>
      <div className="flex h-full flex-col p-8">
        <div className="flex flex-1 flex-col gap-4 rounded bg-white p-4 shadow-md">
          <Form onSave={(form) => form && onPostProduct(form)} />
        </div>
      </div>
    </form>
  );
};

export default ProductNew;
