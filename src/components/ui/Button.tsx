import { ButtonHTMLAttributes, ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: Iprops) => {
  return (
    <>
      <button className={`text-white ${width} p-2 rounded-lg cursor-pointer outline-none${className}`} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;