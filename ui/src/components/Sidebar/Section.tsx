import { Icon, IconExclamationCircle } from "@tabler/icons-react";

interface IProps {
  text: string;
  icon: Icon;
  selected: boolean;
  error?: boolean;
  onClick: () => void;
}

const GameSubmitFormSection: React.FC<IProps> = ({
  text,
  icon: Icon,
  selected,
  onClick,
  error = false,
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onClick}
        className={`text-left w-full p-3 font-bold ${
          selected
            ? "text-primary-brand-color"
            : "text-gray-500 hover:text-primary-brand-color-medium"
        } rounded flex items-center gap-2`}
      >
        <Icon />
        <span>{text}</span>
      </button>
      {error && <IconExclamationCircle size={20} className="text-red-500" />}
    </div>
  );
};

export default GameSubmitFormSection;
