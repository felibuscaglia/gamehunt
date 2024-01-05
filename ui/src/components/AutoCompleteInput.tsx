import { IconSearch } from "@tabler/icons-react";

const AutoCompleteInput = () => {
  return (
    <div className="flex w-full items-center gap-2 bg-gray-100 rounded px-3 py-2 placeholder:text-gray-400">
      <IconSearch size={20} className="text-gray-400" />
      <input className="bg-transparent" placeholder="Search games..." />
    </div>
  );
};

export default AutoCompleteInput;
