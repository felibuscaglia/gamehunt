import { Icon, IconEye, IconEyeOff } from "@tabler/icons-react";
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
  textSize?: "base" | "small";
  limit?: number;
  icon?: Icon;
  disabled?: boolean;
}

const TextInput: React.FC<IProps> = ({
  placeholder,
  label,
  value,
  onChange,
  id,
  type = "text",
  required = false,
  error,
  textSize = "base",
  limit,
  icon: Icon = null,
  disabled = false
}) => {
  const [display, setDisplay] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (limit && inputValue.length > limit) {
      return;
    }

    onChange(e);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-500 font-medium">{label}</label>
          {limit && (
            <span className="text-sm text-gray-500">
              {value.length}/{limit}
            </span>
          )}
        </div>
      )}
      <div className="bg-gray-100 rounded px-3 py-2 flex items-center justify-between">
        {Icon && <Icon size={20} className="text-gray-400 mr-2" />}
        <input
          className={`${
            textSize === "base" ? "text-base" : "text-sm"
          } placeholder:text-gray-400 bg-transparent w-full`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
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

export default TextInput;
