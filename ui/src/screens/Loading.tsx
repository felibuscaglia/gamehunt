import PageHead from "components/PageHead";
import { PRIMARY_BRAND_COLOR } from "lib/constants";
import { PacmanLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <main className="h-screen bg-primary-brand-color-light">
      <PageHead />
      <PacmanLoader
        className="absolute inset-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
        color={PRIMARY_BRAND_COLOR}
      />
    </main>
  );
};

export default LoadingScreen;
