import type { ReactElement } from "react";

export interface ButtonInterface {
  varient: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onclick?: () => void;
}

const ButtonSizeVariants = {
  sm: "text-sm px-4 py-1 rounded-sm",
  md: "text-md px-6 py-2 rounded-md",
  lg: "text-lg px-10 py-4 rounded-lg",
};

const ButtonVarients = {
  primary:
    "bg-blue-500 text-white border border-blue-500 \
     hover:bg-blue-600 hover:border-blue-600 \
     active:bg-blue-700 \
     focus:outline-none focus:ring-2 focus:ring-blue-400 \
     transition-all duration-200 ease-in-out",

  secondary:
    "bg-gray-500 text-white border border-gray-500 \
     hover:bg-gray-600 hover:border-gray-600 \
     active:bg-gray-700 \
     focus:outline-none focus:ring-2 focus:ring-gray-400 \
     transition-all duration-200 ease-in-out",
};

const Button = (props: ButtonInterface) => {
  return (
    <button
      className={`${ButtonVarients[props.varient]} ${
        ButtonSizeVariants[props.size]
      } flex justify-center items-center gap-2`}
      onClick={props.onclick}
    >
      {props.startIcon }
      {props.text}
      {props.endIcon}
    </button>
  );
};

export default Button;
