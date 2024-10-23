import { InputHTMLAttributes, FC } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  );
};

export { Input };
