import { InputProps } from "@/types";

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border rounded-lg p-2 w-full ${className}`}
        aria-label={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
