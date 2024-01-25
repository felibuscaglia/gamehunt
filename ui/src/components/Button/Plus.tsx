import { IconPlus } from "@tabler/icons-react";

interface IProps {
  onClick: () => void;
  disabled?: boolean;
}

const PlusButton: React.FC<IProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-primary-brand-color text-white font-medium p-2 rounded border border-primary-brand-color hover:bg-transparent hover:text-primary-brand-color disabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-primary-brand-color"
      type="button"
    >
      <IconPlus size={15} />
    </button>
  );
};

export default PlusButton;
