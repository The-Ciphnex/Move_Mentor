import { LabelHTMLAttributes, FC } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label: FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label {...props} className="block text-gray-700 font-medium">
      {children}
    </label>
  );
};

export { Label };
