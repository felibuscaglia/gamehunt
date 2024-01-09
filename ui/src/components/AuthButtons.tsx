import { UI_PATHS } from "lib/constants";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <>
      <Link
        className="text-gray-500 hover:text-primary-brand-color whitespace-nowrap"
        to={UI_PATHS.LOGIN}
      >
        Sign in
      </Link>
      <Link
        className="text-white bg-primary-brand-color rounded px-4 py-2 whitespace-nowrap"
        to={UI_PATHS.SIGN_UP}
      >
        Sign up
      </Link>
    </>
  );
};

export default AuthButtons;
