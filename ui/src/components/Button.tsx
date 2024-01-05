interface IProps {
  text: string;
  type?: "submit" | "reset" | "button";
}

const Button: React.FC<IProps> = ({ text, type = "button" }) => {
  return (
    <button
      type={type}
      className="bg-primary-brand-color text-white font-medium py-2 rounded hover:bg-transparent hover:text-primary-brand-color border border-primary-brand-color"
    >
      {text}
    </button>
  );
};

export default Button;
