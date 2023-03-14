import React, { useState } from "react";
import { Button } from "@tm-wear/core";
import { BsFillSaveFill } from "react-icons/bs";
import { ResellerDataSchema } from "../validator";
import { z } from "zod";

interface Props {
  currentValue?: ResellerDataSchema;
  onSave?: (form: ResellerDataSchema) => void;
}

const initialValue: ResellerDataSchema = {
  id: undefined,
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  email: "",
  address: "",
  instagram: "",
  shopee: "",
  tokopedia: "",
  isAdmin: false,
};

const Form = ({ currentValue, onSave }: Props) => {
  const [form, setForm] = useState<ResellerDataSchema>(
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
        const formCheck = ResellerDataSchema.safeParse(form);
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
                Profil
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Isi profil data reseller aktif
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
                      Nama Reseller *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      placeholder="Nama Reseller"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.name || ""}
                      onChange={onInputChange}
                    />
                    {errors?.fieldErrors.name ? (
                      <p className="mt-2 text-sm text-red-500">
                        {errors?.fieldErrors.name[0]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="given-name"
                      placeholder="Username"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.username || ""}
                      onChange={onInputChange}
                    />
                    {errors?.fieldErrors.username ? (
                      <p className="mt-2 text-sm text-red-500">
                        {errors?.fieldErrors.username[0]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="given-name"
                      placeholder="Email"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.email || ""}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password {form.id ? "*" : ""}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="given-name"
                      placeholder="Password"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.password || ""}
                      onChange={onInputChange}
                    />
                    {errors?.fieldErrors.password ? (
                      <p className="mt-2 text-sm text-red-500">
                        {errors?.fieldErrors.password[0]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Masukkan ulang password {form.id ? "*" : ""}
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="given-name"
                      placeholder="Masukkan ulang password"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form.confirmPassword || ""}
                      onChange={onInputChange}
                    />
                    {errors?.fieldErrors.confirmPassword ? (
                      <p className="mt-2 text-sm text-red-500">
                        {errors?.fieldErrors.confirmPassword[0]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No. Telp *
                    </label>
                    <input
                      type="phoneNumber"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="given-name"
                      placeholder="No. Telp"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.phoneNumber || ""}
                      onChange={onInputChange}
                    />
                    {errors?.fieldErrors.phoneNumber ? (
                      <p className="mt-2 text-sm text-red-500">
                        {errors?.fieldErrors.phoneNumber[0]}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address *
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="Masukkan alamat reseller"
                      value={form?.address || ""}
                      onChange={onInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------ */}

        <div className="block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Akun Reseller
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Masukkan akun social media dan akun toko online reseller untuk
                ditampilkan pada laman produk yang reseller jual
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      autoComplete="given-name"
                      placeholder="Instagram"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.instagram ?? "https://www.instagram.com/"}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Shopee
                    </label>
                    <input
                      type="text"
                      name="shopee"
                      id="shopee"
                      autoComplete="given-name"
                      placeholder="Shopee"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.shopee || ""}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="tokopedia"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tokopedia
                    </label>
                    <input
                      type="text"
                      name="tokopedia"
                      id="tokopedia"
                      autoComplete="given-name"
                      placeholder="Tokopedia"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.tokopedia || ""}
                      onChange={onInputChange}
                    />
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
