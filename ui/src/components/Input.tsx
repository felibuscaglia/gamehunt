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
  error
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm text-gray-500 font-medium">{label}</label>
      )}
      <input
        className="bg-gray-100 rounded px-3 py-2 placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        required={required}
      />
      {error && <span className="text-sm text-red-500 capitalize-first">{error}</span>}
    </div>
  );
};

export default Input;
