import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@tm-wear/core";
import { useGetMasterImage } from "@tm-wear/api/queries/master";
import { IoClose } from "react-icons/io5";
import { MasterImageTypes } from "@tm-wear/api/types/master";
import { ProductDataImage } from "../types";

interface Props {
  dialog: boolean;
  setDialog: (dialog: boolean) => void;
  currentImages: ProductDataImage[];
  onSubmit?: (images: ProductDataImage[]) => void;
  // currentImages: Pick<ProductDataImage, "id" | "isPrimary" | "image">;
  // onSubmit?: (images: Pick<ProductDataImage, "isPrimary" | "image">) => void;
}

const ProductImageDialog = ({
  dialog,
  setDialog,
  currentImages,
  onSubmit,
}: Props) => {
  const { data: imageList } = useGetMasterImage("product");
  const [selectedList, setSelectedList] = useState<ProductDataImage[]>([]);

  const isSelected = (item: MasterImageTypes) => {
    return selectedList.map((item) => item.image).includes(item.key);
  };
  const onSelect = (item: MasterImageTypes) => {
    if (!isSelected(item)) {
      setSelectedList((prev) => [
        ...prev,
        { isPrimary: false, image: item.key },
      ]);
    } else {
      setSelectedList(selectedList.filter((data) => data.image !== item.key));
    }
  };

  useEffect(() => {
    if (!dialog) {
      setSelectedList([]);
    }
  }, [dialog]);

  return (
    <Dialog
      open={dialog}
      onClose={() => setDialog(false)}
      className="flex w-full overflow-auto rounded-md bg-white"
      size="md"
    >
      <div className="flex items-center justify-between p-3">
        <span className="font-bold">Pilih Gambar Produk</span>
        <button
          className="rounded-full p-2 transition-all hover:bg-gray-100"
          onClick={() => setDialog(false)}
        >
          <IoClose />
        </button>
      </div>
      <div className="grid h-0 w-full flex-1 grid-cols-4 gap-6 overflow-auto p-3">
        {imageList?.data
          ?.filter(
            (item) => !currentImages.map((img) => img.image).includes(item.key),
          )
          .map((item) => (
            <div key={item.value} className="relative">
              <img
                aria-hidden
                className={`cursor-pointer rounded-md ${
                  isSelected(item) ? "ring-1" : ""
                } ring-blue-700`}
                src={item.key}
                width={"100%"}
                alt=""
                onClick={() => onSelect(item)}
              />
            </div>
          ))}
      </div>
      <div className="flex items-center justify-end p-3">
        <Button onClick={() => onSubmit && onSubmit(selectedList)}>
          Submit
        </Button>
      </div>
    </Dialog>
  );
};

export default ProductImageDialog;
