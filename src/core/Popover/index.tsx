import { useEffect, useRef } from "react";
import { createPopper, Instance, Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";

interface PopoverProps {
  onClose: () => void;
  anchorRef: Element | null;
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
  placement?: Placement;
}

const Popover = ({
  anchorRef = null,
  overlay,
  onClose,
  children,
  className,
  placement = "bottom-start",
}: PopoverProps) => {
  const popperRef = useRef<HTMLDivElement>(null);

  const { styles, attributes } = usePopper(anchorRef, popperRef.current, {
    placement: placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  let popperInstance: Instance | null = null;

  const handleUpdate = () => {
    if (popperInstance !== null) {
      popperInstance.update();
    }
  };

  const handleOpen = () => {
    if (anchorRef && popperRef.current) {
      popperRef.current.hidden = false;
      popperInstance = createPopper(anchorRef, popperRef.current, {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
    }
  };

  const handleClose = () => {
    if (popperInstance !== null && popperRef.current) {
      popperRef.current.hidden = true;
      popperInstance.destroy();
      popperInstance = null;
    }
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     anchorRef &&
  //     popperRef.current &&
  //     !anchorRef.contains(event.target as Node) &&
  //     !popperRef.current.contains(event.target as Node)
  //   ) {
  //     handleClose();
  //     onClose();
  //   }
  // };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
      onClose();
    }
  };

  useEffect(() => {
    if (anchorRef) {
      handleOpen();
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      handleClose();
      document.removeEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
    // eslint-disable-next-line
  }, [anchorRef]);

  return anchorRef
    ? createPortal(
        <div
          aria-hidden
          onClick={() => onClose()}
          className={
            overlay
              ? "fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-10 transition"
              : ""
          }
        >
          <div
            aria-hidden
            onClick={(e) => e.stopPropagation()}
            ref={popperRef}
            style={styles.popper}
            {...attributes.popper}
            // onFocus={handleOpen}
            onBlur={handleClose}
            onAnimationStart={handleUpdate}
            onAnimationEnd={handleUpdate}
            onAnimationIteration={handleUpdate}
            onTransitionEnd={handleUpdate}
            onScroll={handleUpdate}
            onTouchStart={handleUpdate}
            onTouchMove={handleUpdate}
            onTouchEnd={handleUpdate}
            onTouchCancel={handleUpdate}
            className={`rounded-md bg-white shadow-md ${className}`}
          >
            {children}
          </div>
        </div>,
        document.querySelector("body") as Element,
      )
    : null;
};
export default Popover;
