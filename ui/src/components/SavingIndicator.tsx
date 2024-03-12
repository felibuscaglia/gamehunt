import { IconX } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR } from "lib/constants";
import { MoonLoader } from "react-spinners";

interface IProps {
  saving: boolean;
  lastSaved: null | Date;
  error?: boolean;
}

const SavingIndicator: React.FC<IProps> = ({ saving, lastSaved, error = false }) => {
  if (error) {
    return (
      <div className="flex items-center gap-1 justify-end w-full">
        <IconX size={12} className="text-gray-500" />
        <span className="text-gray-500 text-sm">Failed to save.</span>
      </div>
    );
  }

  const formattedLastSaved = lastSaved ? lastSaved.toLocaleString() : "";
  return (
    <div className="flex items-center justify-end w-full gap-2">
      <MoonLoader loading={saving} size={12} color={PRIMARY_BRAND_COLOR} />
      <span className="text-gray-500 text-sm whitespace-nowrap">
        {saving ? "Saving..." : `Last saved: ${formattedLastSaved}`}
      </span>
    </div>
  );
};

export default SavingIndicator;
