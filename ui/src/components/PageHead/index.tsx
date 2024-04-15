import { API_PATHS, UI_PATHS } from "lib/constants";
import { Link, useNavigate } from "react-router-dom";
import AutoCompleteInput from "../Inputs/AutoComplete";
import Logo from "../Logo";
import AuthButtons from "../AuthButtons";
import UserPanel from "./UserPanel";
import { useAppSelector } from "store";
import Popover from "./Popover";
import { IGame } from "lib/interfaces";

const SECTION_CLASSNAMES = "flex items-center gap-6";
const BTN_CLASSNAMES =
  "hover:bg-gray-100 text-gray-500 py-1 px-2 cursor-pointer hover:text-gray-700";

interface IProps {
  withMarginBottom?: boolean;
}

const PageHead: React.FC<IProps> = ({ withMarginBottom = true }) => {
  const user = useAppSelector((state) => state.user.user);
  const loadingUser = useAppSelector((state) => state.loading.user);

  const navigate = useNavigate();

  return (
    <nav
      className={`w-full z-40 sm:sticky top-0 bg-white border-b border-gray-100 p-4 flex items-start sm:items-center justify-between relative sm:h-20 h-28 ${
        withMarginBottom ? "mb-4" : "mb-0"
      }`}
    >
      <section className={SECTION_CLASSNAMES + " w-1/2 sm:w-1/3"}>
        <Link to={UI_PATHS.HOME}>
          <Logo withName />
        </Link>
        <ul className="sm:items-center sm:gap-4 hidden sm:flex">
          <Link to={UI_PATHS.HOME} className={`${BTN_CLASSNAMES} rounded`}>
            Home
          </Link>
          <Popover />
        </ul>
      </section>
      <section className={SECTION_CLASSNAMES + " justify-end w-1/2"}>
        <div className="w-full absolute top-16 sm:static sm:top-0 px-4 sm:px-0 inset-1/2 -translate-x-1/2 -translate-y-1/2 sm:inset-auto sm:translate-x-0 sm:translate-y-0">
          <AutoCompleteInput<IGame>
            searchApiPath={API_PATHS.SEARCH_GAMES_BY_NAME}
            withIcon
            placeholder="Search games..."
            limit={6}
            displayKey="name"
            onSelect={(selectedGame) =>
              navigate(
                UI_PATHS.GAME_DETAIL.replace(
                  ":gameUrlSlug",
                  selectedGame.urlSlug || ""
                )
              )
            }
          />
        </div>
        {user !== null ? (
          <UserPanel loading={loadingUser} user={user} />
        ) : (
          <AuthButtons />
        )}
      </section>
    </nav>
  );
};

export default PageHead;
