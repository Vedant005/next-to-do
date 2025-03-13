import { ButtonProps } from "@/types";
import clsx from "clsx";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  actionButton,
  bgColor,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none",
        actionButton && "text-white hover:bg-blue-800 focus:ring-4",
        bgColor,
        className
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
