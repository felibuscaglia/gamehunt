import { IconBrandGoogle, IconBrandX } from "@tabler/icons-react";
import { API_PATHS } from "lib/constants";

const BTN_CLASSNAMES =
  "flex items-center w-full text-gray-600 font-medium py-2 bg-gray-100 rounded hover:text-primary-brand-color";

const SocialAuth = () => {
  return (
    <div className="flex flex-col gap-4 w-1/4 pb-8 border-b border-b-gray-200">
      <button
        className={BTN_CLASSNAMES}
        onClick={() =>
          (window.location.href = `${process.env.REACT_APP_API_URL}${API_PATHS.GOOGLE_AUTH}`)
        }
      >
        <IconBrandGoogle className="w-1/4" stroke={1.5} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialAuth;
