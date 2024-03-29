import { PacmanLoader } from "react-spinners";

interface IProps {
  text: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  textSize?: "base" | "small";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({
  text,
  type = "button",
  loading = false,
  disabled = false,
  textSize = "base",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${
        textSize === "small" ? "text-sm" : "text-base"
      } bg-primary-brand-color text-white font-medium py-2 rounded border border-primary-brand-color ${
        !loading && !disabled
          ? "hover:bg-transparent hover:text-primary-brand-color"
          : ""
      } disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center w-full`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? <PacmanLoader color="white" size={10} /> : <span>{text}</span>}
    </button>
  );
};

export default Button;
