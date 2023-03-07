import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonStyles = cva(
  "btn p-2 rounded-md transition inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 text-white border border-blue-500 hover:border-blue-700 hover:bg-blue-700",
        success:
          "bg-green-600 text-white border border-green-600 hover:border-green-700 hover:bg-green-700",
        warning:
          "bg-yellow-500 text-white border border-yellow-500 hover:border-yellow-600 hover:bg-yellow-600",
        error:
          "bg-red-500 text-white border hover:bg-red-600 border-red-500 hover:border-red-600 ",
        default:
          "text-gray-800 border hover:bg-gray-100 border-transparent hover:border-gray-100 ",
      },
      disabled: {
        true: "bg-gray-300 border-gray-300 hover:bg-gray-300 hover:border-gray-300",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  title?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  // Types buttonStyles
  variant,
  disabled,

  // Types component
  type = "button",
  title,
  className,
  children,
  onClick,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={buttonStyles({
        variant,
        disabled,
        class: className,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
