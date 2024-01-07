import { PacmanLoader } from "react-spinners";

interface IProps {
  text: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
}

const Button: React.FC<IProps> = ({
  text,
  type = "button",
  loading = false,
}) => {
  return (
    <button
      type={type}
      className={`bg-primary-brand-color text-white font-medium py-2 rounded border border-primary-brand-color ${
        !loading ? "hover:bg-transparent hover:text-primary-brand-color" : ""
      } disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center`}
      disabled={loading}
    >
      {loading ? <PacmanLoader color="white" size={10} /> : <span>{text}</span>}
    </button>
  );
};

export default Button;
