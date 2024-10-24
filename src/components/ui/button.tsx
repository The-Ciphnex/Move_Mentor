import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "link";
}

const Button: FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  const baseClasses = "px-4 py-2 rounded text-white focus:outline-none";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    link: "bg-transparent text-blue-600 hover:underline",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export { Button };
