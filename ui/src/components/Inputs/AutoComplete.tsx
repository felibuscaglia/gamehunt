import { IconSearch } from "@tabler/icons-react";

interface IProps {
  withIcon?: boolean;
  textSize?: "base" | "small";
  placeholder?: string;
}

const AutoCompleteInput: React.FC<IProps> = ({
  withIcon = false,
  textSize = "base ",
  placeholder
}) => {
  return (
    <div className="flex w-full items-center gap-2 bg-gray-100 rounded px-3 py-2 placeholder:text-gray-400">
      {withIcon && <IconSearch size={20} className="text-gray-400" />}
      <input
        className={`${
          textSize === "small" ? "text-sm" : "text-base"
        } bg-transparent`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AutoCompleteInput;
