import React from "react";
import { Form, usePostCategory } from "@tm-wear/app/Category";

const CategoryNew = () => {
  const { mutate: onPostCategory } = usePostCategory();
  return (
    <div className="flex h-full flex-col p-8">
      <div className="flex flex-1 flex-col gap-4 rounded bg-white p-4 shadow-md">
        <Form onSave={(form) => form && onPostCategory(form)} />
      </div>
    </div>
  );
};

export default CategoryNew;
