import React from "react";
import { IoClose } from "react-icons/io5";
import Button from "../Button";
import Dialog from "../Dialog";

export interface Props {
  open: boolean;
  title: string;
  message: string;
  okLabel?: string;
  closeLabel?: string;
  onSubmit?: () => void;
  onClose?: () => void;
}

const Confirmation = ({
  open,
  title,
  message,
  okLabel = "OK",
  closeLabel = "Cancel",
  onSubmit,
  onClose,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose && onClose()}
      className="flex w-full overflow-auto rounded-md bg-white"
      size="sm"
    >
      <div className="flex items-center justify-between p-3">
        <span className="font-bold">{title}</span>
        <button
          className="rounded-full p-2 transition-all hover:bg-gray-100"
          onClick={onClose}
        >
          <IoClose />
        </button>
      </div>
      <div className="flex items-center justify-center p-5">{message}</div>
      <div className="flex items-center justify-end gap-4 p-3">
        <Button variant={"default"} onClick={onClose}>
          {closeLabel}
        </Button>
        <Button onClick={onSubmit} className="px-4">
          {okLabel}
        </Button>
      </div>
    </Dialog>
  );
};

export default Confirmation;
