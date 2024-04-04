import { PRIMARY_BRAND_COLOR } from "lib/constants";
import { PacmanLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <main className="h-screen bg-primary-brand-color-light flex items-center justify-center">
      <PacmanLoader color={PRIMARY_BRAND_COLOR} />
    </main>
  );
};

export default LoadingScreen;
