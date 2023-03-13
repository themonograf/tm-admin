import React from "react";
import { Form, usePostReseller } from "@tm-wear/app/Reseller";

const ResellerNew = () => {
  const { mutate: onPostReseller } = usePostReseller();
  return (
    <div className="flex h-full flex-col p-8">
      <div className="flex flex-1 flex-col gap-4 rounded bg-white p-4 shadow-md">
        <Form onSave={(form) => form && onPostReseller(form)} />
      </div>
    </div>
  );
};

export default ResellerNew;
