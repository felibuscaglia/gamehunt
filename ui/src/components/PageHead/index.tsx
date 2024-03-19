import { IS_LOGGED_IN_KEY, UI_PATHS } from "lib/constants";
import { Link } from "react-router-dom";
import AutoCompleteInput from "../Inputs/AutoComplete";
import Logo from "../Logo";
import AuthButtons from "../AuthButtons";
import UserPanel from "./UserPanel";
import { useAppSelector } from "store";
import Popover from "./Popover";

const SECTION_CLASSNAMES = "flex items-center gap-6";
const BTN_CLASSNAMES =
  "hover:bg-gray-100 text-gray-500 py-1 px-2 cursor-pointer hover:text-gray-700";

const PageHead = () => {
  const user = useAppSelector((state) => state.user.user);
  const loadingUser = useAppSelector((state) => state.loading.user);

  return (
    <nav className="z-40 sticky top-0 bg-white border-b border-gray-100 p-4 mb-4 flex items-center justify-between h-20">
      <section className={SECTION_CLASSNAMES + " w-1/3"}>
        <Link to={UI_PATHS.HOME}>
          <Logo />
        </Link>
        <ul className="flex items-center gap-4">
          <li className={`${BTN_CLASSNAMES} rounded`}>Home</li>
          <Popover />
          <li className={`${BTN_CLASSNAMES} rounded`}>Platforms</li>
          <li className={`${BTN_CLASSNAMES} rounded`}>Newsletter</li>
          <li className={`${BTN_CLASSNAMES} rounded`}>About</li>
        </ul>
      </section>
      <section className={SECTION_CLASSNAMES + " justify-end w-5/12"}>
        <AutoCompleteInput
          searchApiPath="as"
          withIcon
          placeholder="Search games..."
          limit={2}
          displayKey=""
          onSelect={() => {}}
        />
        {localStorage.getItem(IS_LOGGED_IN_KEY) === "1" && user !== null ? (
          <UserPanel loading={loadingUser} user={user} />
        ) : (
          <AuthButtons />
        )}
      </section>
    </nav>
  );
};

export default PageHead;
