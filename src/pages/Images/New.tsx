import React, { useState } from "react";
import { FcUpload } from "react-icons/fc";
import { AiFillCloseCircle } from "react-icons/ai";
import { useUploadImage } from "@tm-wear/app/Images";
import { Button, Dropdown } from "@tm-wear/core";
import { useNavigate } from "react-router-dom";

const ImagesNew = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");
  const [filesMultiple, setFilesMultiple] = useState<File[]>([]);
  const { mutate } = useUploadImage((res) => {
    res.success ? navigate("/images") : undefined;
  });

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const ImagesArray = Object.entries(e.target.files ?? {}).map(
      (file) => file[1],
    );
    e.target.value = "";
    setFilesMultiple(ImagesArray);
  };
  const onDeleteImage = (image: File) => {
    setFilesMultiple(
      filesMultiple?.filter((file: File) => file.name !== image.name),
    );
  };

  const onSubmitUpload = () => {
    const formData = new FormData();
    formData.append("category", category);
    for (let i = 0; i < filesMultiple.length; i++) {
      formData.append("image", filesMultiple[i]);
    }
    mutate(formData);
  };

  return (
    <div className="flex h-full flex-col p-8">
      <div className="flex flex-1 flex-col gap-4 rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div></div>
          <div id="uploadAs" className="flex items-center gap-4">
            <span className="flex">Upload as</span>
            <Dropdown
              value={category}
              onChange={(data) => setCategory(data.value)}
              options={[
                { label: "Product", value: "product" },
                { label: "Category", value: "category" },
                { label: "Banner", value: "banner" },
              ]}
            />
          </div>
        </div>
        <input
          id="fileInput"
          disabled={filesMultiple.length >= 10}
          type="file"
          onChange={onFileUpload}
          multiple
          size={2000}
          accept="image/png, image/jpg, image/jpeg"
          className="hidden"
        />
        <label
          htmlFor="fileInput"
          className="flex h-full w-full flex-col items-center justify-center gap-5 border-b"
        >
          <FcUpload className="" fontSize={"80px"} />
          <span>Click Anywhere to Upload Image</span>
        </label>
        <div className="flex gap-4">
          {filesMultiple?.map((file) => (
            <div key={file.name} className="relative">
              <img alt="" src={URL.createObjectURL(file)} className="h-16" />
              <div
                aria-hidden
                onClick={() => onDeleteImage(file)}
                className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-white text-red-500"
              >
                <AiFillCloseCircle fontSize={"20px"} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-4">
          <Button onClick={() => navigate("/images")} variant="error">
            Cancel
          </Button>
          <div className="flex gap-4">
            <Button onClick={() => setFilesMultiple([])} variant="error">
              Reset
            </Button>
            <Button
              disabled={
                !filesMultiple.length ||
                filesMultiple.length > 10 ||
                category === ""
              }
              onClick={onSubmitUpload}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesNew;
