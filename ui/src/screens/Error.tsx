import PageHead from "components/PageHead";
import { UI_PATHS } from "lib/constants";
import { Link } from "react-router-dom";

interface IProps {
  msg: string;
}
const ErrorScreen: React.FC<IProps> = ({ msg }) => {
  return (
    <main>
      <PageHead />
      <div
        className="absolute inset-1/2 w-1/2 flex items-center flex-col gap-4"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h2 className="text-4xl font-semibold text-center">{msg}</h2>
        <Link className="underline text-primary-brand-color" to={UI_PATHS.HOME}>Go back.</Link>
      </div>
    </main>
  );
};

export default ErrorScreen;
