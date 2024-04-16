import { HttpStatusCode } from "axios";
import Button from "components/Button";
import PageHead from "components/PageHead";
import { UI_PATHS, UNEXPECTED_ERROR_MSG } from "lib/constants";
import { useNavigate } from "react-router-dom";

interface IProps {
  status: HttpStatusCode;
}

const ErrorScreen: React.FC<IProps> = ({ status }) => {
  const navigate = useNavigate();

  let title: string;
  let description: string | null = null;

  if (status === HttpStatusCode.NotFound) {
    title = "We seem to have lost this page";
    description =
      "Uh-oh! It seems the page you're looking for is missing. No worries, let's navigate back to the homepage for more exciting content!";
  } else {
    title = UNEXPECTED_ERROR_MSG;
  }

  return (
    <main className="h-screen flex flex-col">
      <PageHead withMarginBottom={false} />
      <section className="bg-primary-brand-color-light flex-grow flex items-center justify-center">
        <div className="bg-white rounded p-7 w-2/3 sm:w-1/3 flex flex-col items-center">
          <span className="text-gray-500 text-sm text-left w-full">
            {status}
          </span>
          <h2 className="font-semibold text-xl sm:text-3xl">{title}</h2>
          {description && <p className="text-gray-600 my-4">{description}</p>}
          <div className="w-3/4 sm:w-1/2">
            <Button
              onClick={() => navigate(UI_PATHS.HOME)}
              textSize="small"
              text="Go to homepage"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ErrorScreen;
