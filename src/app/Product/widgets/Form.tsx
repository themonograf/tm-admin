import React, { useState } from "react";
import appConfig from "@tm-wear/app.config";
import { NumericFormat } from "react-number-format";
import { useGetMasterCategory } from "@tm-wear/api/queries/master";
import { ProductDataImage, ProductForm } from "../types";
import { Button } from "@tm-wear/core";
import ProductImageDialog from "../components/ProductImageDialog";
import {
  IoMdRadioButtonOn,
  IoMdRadioButtonOff,
  IoMdClose,
} from "react-icons/io";
import { cloneDeep } from "@fitzzz/utils";
import { BsFillSaveFill } from "react-icons/bs";
import { Confirmation } from "@tm-wear/core/custom";
import { useRemoveProductImage } from "../queries";
import { omit } from "lodash";

interface Props {
  currentValue?: Partial<ProductForm> | null;
  onSave?: (form: Partial<ProductForm> | undefined) => void;
}

type ProductDataImageForm = Omit<
  ProductDataImage,
  "productId" | "createdAt" | "updatedAt"
>;

const Form = ({ currentValue = null, onSave }: Props) => {
  const { data: categoryList } = useGetMasterCategory();
  const { mutate: onRemoveImage } = useRemoveProductImage((response) => {
    if (response.success) {
      onDeleteImage(omit(remove, ["id"]));
      setRemove(null);
    }
  });

  const [form, setForm] = useState<Partial<ProductForm> | null>(currentValue);
  const [dialog, setDialog] = useState<boolean>(false);
  const [remove, setRemove] = useState<ProductDataImageForm | null>(null);

  const onInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onDeleteImage = (item: ProductDataImageForm) => {
    if (item.id) {
      setRemove(item);
    } else {
      const current = cloneDeep(form?.productImage);
      const removed = current?.filter((obj) => obj.image !== item.image);
      setForm((prev) => ({ ...prev, productImage: removed }));
    }
  };

  const onSetImagePrimary = (item: ProductDataImageForm) => {
    const current = cloneDeep(form?.productImage);
    const primary = current?.map((obj) => ({
      ...obj,
      isPrimary: obj.image === item.image,
    }));
    setForm((prev) => ({ ...prev, productImage: primary }));
  };

  return (
    <>
      <div className="rounded-md bg-gray-50 p-4">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Detail Produk
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Detail lengkap seputar produk yang akan dijual
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nama Produk *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      placeholder="Nama Produk"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.name || ""}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="variant"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Varian *
                    </label>
                    <input
                      required
                      type="text"
                      name="variant"
                      id="variant"
                      autoComplete="given-name"
                      placeholder="Varian Produk"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.variant || ""}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="prefix"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Prefix *
                    </label>
                    <input
                      required
                      type="text"
                      name="prefix"
                      id="prefix"
                      autoComplete="given-name"
                      placeholder="Prefix"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={form?.prefix || ""}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="productCategoryId"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Kategori *
                    </label>
                    <select
                      required
                      id="productCategoryId"
                      name="productCategoryId"
                      autoComplete="productCategoryId"
                      className="mt-2 block w-full rounded-md border-0 bg-white py-2.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={onInputChange}
                      value={form?.productCategoryId}
                    >
                      <option>Select</option>
                      {categoryList?.data.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  {form?.id ? (
                    <div className="col-span-4">
                      <label
                        htmlFor="prefix-field"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Slug
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                          {appConfig.ecommerceSite}/product/
                        </span>
                        <input
                          disabled
                          type="text"
                          name="slug"
                          id="prefix-field"
                          className="block w-full flex-1 rounded-none rounded-r-md border-0 px-2 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="masukkan-slug-product-disini"
                          value={form.slug || ""}
                          onChange={onInputChange}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Deskripsi *
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      id="description"
                      name="description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="Masukkan deskripsi"
                      value={form?.description}
                      onChange={onInputChange}
                    ></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your product.
                  </p>
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
                Harga Produk
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Tambahkan harga untuk produk baru
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="basicPrice"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Harga Awal (Base) *
                    </label>
                    <NumericFormat
                      required
                      placeholder="Harga Awal"
                      name="basicPrice"
                      id="basicPrice"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      allowNegative={false}
                      thousandSeparator=","
                      prefix={"Rp. "}
                      decimalScale={0}
                      isAllowed={(values) => {
                        const { floatValue } = values;
                        return (floatValue || 0) <= 99999999;
                      }}
                      value={form?.basicPrice || ""}
                      onValueChange={(values) => {
                        setForm((prev) => ({
                          ...prev,
                          basicPrice: values.floatValue,
                        }));
                      }}
                    />
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="catalogPrice"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Harga Katalog *
                    </label>
                    <NumericFormat
                      required
                      placeholder="Harga Katalog"
                      name="catalogPrice"
                      id="catalogPrice"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      allowNegative={false}
                      thousandSeparator=","
                      prefix={"Rp. "}
                      decimalScale={0}
                      isAllowed={(values) => {
                        const { floatValue } = values;
                        return (floatValue || 0) <= 99999999;
                      }}
                      value={form?.catalogPrice || ""}
                      onValueChange={(values) => {
                        setForm((prev) => ({
                          ...prev,
                          catalogPrice: values.floatValue,
                        }));
                      }}
                    />
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="olshopPrice"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Harga Olshop *
                    </label>
                    <NumericFormat
                      required
                      placeholder="Harga Olshop"
                      name="olshopPrice"
                      id="olshopPrice"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      allowNegative={false}
                      thousandSeparator=","
                      prefix={"Rp. "}
                      decimalScale={0}
                      isAllowed={(values) => {
                        const { floatValue } = values;
                        return (floatValue || 0) <= 99999999;
                      }}
                      value={form?.olshopPrice || ""}
                      onValueChange={(values) => {
                        setForm((prev) => ({
                          ...prev,
                          olshopPrice: values.floatValue,
                        }));
                      }}
                    />
                  </div>
                  <div className="col-span-4">
                    <label
                      htmlFor="minLivePrice"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Harga Live
                    </label>
                    <NumericFormat
                      required
                      placeholder="Harga Live"
                      name="minLivePrice"
                      id="minLivePrice"
                      className="mt-2 block w-full rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      allowNegative={false}
                      thousandSeparator=","
                      prefix={"Rp. "}
                      decimalScale={0}
                      isAllowed={(values) => {
                        const { floatValue } = values;
                        return (floatValue || 0) <= 99999999;
                      }}
                      value={form?.minLivePrice || ""}
                      onValueChange={(values) => {
                        setForm((prev) => ({
                          ...prev,
                          minLivePrice: values.floatValue,
                        }));
                      }}
                    />
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
                Gambar
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Tambahkan gambar produk dari master data gambar
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="flex justify-end">
                  <Button onClick={() => setDialog(true)}>Tambah Gambar</Button>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  {form?.productImage?.map((item) => (
                    <div key={item.image} className="relative">
                      <button
                        type="button"
                        onClick={() => onDeleteImage(item)}
                        className="absolute right-2 top-2 rounded-full border border-blue-500 bg-blue-500 text-white"
                      >
                        <IoMdClose />
                      </button>
                      <button
                        title={item.isPrimary ? "Primary" : "Set To Primary"}
                        type="button"
                        onClick={() => onSetImagePrimary(item)}
                        className={
                          item.isPrimary
                            ? "absolute left-2 top-2 rounded-full border border-blue-500 bg-blue-500 text-white"
                            : "absolute left-2 top-2 rounded-full border border-white text-white"
                        }
                      >
                        {item.isPrimary ? (
                          <IoMdRadioButtonOn />
                        ) : (
                          <IoMdRadioButtonOff />
                        )}
                      </button>
                      <img
                        aria-hidden
                        className={`cursor-pointer rounded-md`}
                        src={item?.image || ""}
                        width={"100%"}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            form && onSave && onSave(form);
          }}
          className="gap-3"
          variant={"success"}
        >
          <BsFillSaveFill fontSize={"19px"} />
          Save
        </Button>
      </div>
      <ProductImageDialog
        currentImages={form?.productImage || []}
        dialog={dialog}
        setDialog={setDialog}
        onSubmit={(value) => {
          setForm((prev) => ({
            ...prev,
            productImage: [...(prev?.productImage || []), ...value],
          }));
          setDialog(false);
        }}
      />
      <Confirmation
        open={!!remove}
        onClose={() => setRemove(null)}
        title={`Hapus Gambar`}
        message={`Apakah anda yakin ingin hapus foto ini?`}
        onSubmit={() => remove?.id && onRemoveImage(remove?.id)}
      />
    </>
  );
};

export default Form;
