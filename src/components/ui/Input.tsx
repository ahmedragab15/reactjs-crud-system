import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
bla?:string
}

const Input = ({...rest}: Iprops) => {
  return (
    <>
      <input className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg p-3 text-md" {...rest} />
    </>
  );
};

export default Input;