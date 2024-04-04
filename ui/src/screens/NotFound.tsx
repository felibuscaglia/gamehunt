import Button from "components/Button";
import PageHead from "components/PageHead";
import { UI_PATHS } from "lib/constants";
import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen flex flex-col">
      <PageHead withMarginBottom={false} />
      <section className="bg-primary-brand-color-light flex-grow flex items-center justify-center">
        <div className="bg-white rounded p-7 w-1/3 flex flex-col items-center">
          <span className="text-gray-500 text-sm text-left w-full">404</span>
          <h2 className="font-semibold text-3xl">
            We seem to have lost this page
          </h2>
          <p className="text-gray-600 my-4">
            Uh-oh! It seems the page you're looking for is missing. No worries,
            let's navigate back to the homepage for more exciting content!
          </p>
          <div className="w-1/2">
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

export default NotFoundScreen;
