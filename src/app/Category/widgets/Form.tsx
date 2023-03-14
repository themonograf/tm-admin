import React, { useState } from "react";
import { Button } from "@tm-wear/core";
import { BsFillSaveFill } from "react-icons/bs";
import { CategoryDataSchema } from "../validator";
import { z } from "zod";

interface Props {
  currentValue?: CategoryDataSchema;
  onSave?: (form: CategoryDataSchema) => void;
}

const initialValue: CategoryDataSchema = {
  id: undefined,
  category: "",
  image: "",
};

const Form = ({ currentValue, onSave }: Props) => {
  const [form, setForm] = useState<CategoryDataSchema>(
    currentValue || initialValue,
  );
  const [errors, setErrors] = useState<z.typeToFlattenedError<
    typeof form
  > | null>(null);

  const onInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formCheck = CategoryDataSchema.safeParse(form);
        if (!formCheck.success) {
          setErrors(formCheck.error.formErrors);
        } else {
          setErrors(null);
          form && onSave && onSave(form);
        }
      }}
    >
      <div className="mb-4 rounded-md bg-gray-50 p-4">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Category
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Tambah/Ubah data kategori untuk ditampilkan di laman katalog
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nama Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      autoComplete="given-name"
                      placeholder="Nama Category"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.category || ""}
                      onChange={onInputChange}
                    />
                    {errors?.fieldErrors.category ? (
                      <p className="mt-2 text-sm text-red-500">
                        {errors?.fieldErrors.category[0]}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="gap-3" variant={"success"}>
          <BsFillSaveFill fontSize={"19px"} />
          Save
        </Button>
      </div>
    </form>
  );
};

export default Form;
