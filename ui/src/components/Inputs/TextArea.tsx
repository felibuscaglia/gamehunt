interface IProps {
  label: string;
  limit: number;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
  error?: string;
}

const TextArea: React.FC<IProps> = ({
  label,
  limit,
  value,
  placeholder,
  id,
  error,
  onChange,
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <span className="text-sm text-gray-500">
            {value.length}/{limit}
          </span>
        </div>
      )}
      <textarea
        className="bg-gray-100 text-sm placeholder:text-gray-400 rounded px-3 py-2 w-full h-40"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        id={id}
      />
      {error && (
        <span className="text-sm text-red-500 capitalize-first">{error}</span>
      )}
    </div>
  );
};

export default TextArea;
