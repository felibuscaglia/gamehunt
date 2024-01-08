import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

interface IProps {
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  type?: "text" | "password" | "email";
  required?: boolean;
  error?: string;
}

const Input: React.FC<IProps> = ({
  placeholder,
  label,
  value,
  onChange,
  id,
  type = "text",
  required = false,
  error,
}) => {
  const [display, setDisplay] = useState(false);
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm text-gray-500 font-medium">{label}</label>
      )}
      <div className="bg-gray-100 rounded px-3 py-2 flex items-center justify-between">
        <input
          className="placeholder:text-gray-400 bg-transparent w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          type={type === "password" && display ? "text" : type}
          required={required}
        />
        {type === "password" && (
          <button
            className="text-gray-400"
            onClick={() => setDisplay(!display)}
            type="button"
          >
            {!display ? <IconEye /> : <IconEyeOff />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-sm text-red-500 capitalize-first">{error}</span>
      )}
    </div>
  );
};

export default Input;
