import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: Iprops) => {
  return (
    <>
      <button className={`${className} ${width} text-white duration-200 font-medium  p-3 rounded-lg cursor-pointer outline-none`} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;