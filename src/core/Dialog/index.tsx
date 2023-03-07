import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./dialog.module.scss";

interface DialogProps {
  ref?: React.LegacyRef<HTMLDivElement>;
  open: boolean;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  ref,
  open,
  size = "sm",
  className,
  onClose,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (open) {
      setShowDialog(true);
      setIsOpen(true);
    } else {
      setShowDialog(false);
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const dialog = (
    <div
      className={`dialog-container flex h-full items-center justify-center outline-none transition-opacity delay-[0] duration-200`}
      style={{ opacity: showDialog ? 1 : 0 }}
    >
      <div
        ref={ref}
        className={`${styles.dialogBox} ${styles[size || ""]} ${
          className || ""
        }`}
      >
        {children}
      </div>
    </div>
  );

  return open || isOpen
    ? ReactDOM.createPortal(
        <div role="presentation" className="root fixed inset-0 z-[1300]">
          <div
            role="presentation"
            className={`overlay fixed inset-0 flex items-center justify-center overflow-auto bg-black/20 transition-opacity delay-[0] duration-200`}
            style={{ opacity: showDialog ? 1 : 0 }}
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            aria-hidden
          />
          {dialog}
        </div>,
        document.body,
      )
    : null;
};

export default Dialog;
