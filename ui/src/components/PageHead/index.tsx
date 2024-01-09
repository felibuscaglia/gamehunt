import { API_PATHS, IS_LOGGED_IN_KEY, UI_PATHS } from "lib/constants";
import { Link } from "react-router-dom";
import AutoCompleteInput from "../AutoCompleteInput";
import Logo from "../Logo";
import AuthButtons from "../AuthButtons";
import UserPanel from "./UserPanel";
import { useEffect, useState } from "react";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IAuthUser } from "lib/interfaces";

const UL_ELEMENTS = ["Home", "Categories", "Newsletter", "Advertise", "About"];

const SECTION_CLASSNAMES = "flex items-center gap-6 w-1/3";
const BTN_CLASSNAMES =
  "hover:bg-gray-100 text-gray-500 py-1 px-2 cursor-pointer hover:text-gray-700";

const PageHead = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [userNotLoggedIn, setUserNotLoggedIn] = useState(false);
  const [user, setUser] = useState<IAuthUser>();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    axiosAuth.get<IAuthUser>(API_PATHS.GET_ME)
      .then(({ data }) => {
        setUser(data);
        setLoadingUser(false);
      })
      .catch(() => setUserNotLoggedIn(true))
  }, []);

  return (
    <nav className="border-b border-gray-100 p-4 mb-4 flex items-center justify-between">
      <section className={SECTION_CLASSNAMES}>
        <Link to={UI_PATHS.HOME}>
          <Logo />
        </Link>
        <ul className="flex items-center gap-4">
          {UL_ELEMENTS.map((el) => (
            <li
              className={`${BTN_CLASSNAMES} rounded`}
              key={`page-head-ul-element-${el}`}
            >
              {el}
            </li>
          ))}
        </ul>
      </section>
      <section className={SECTION_CLASSNAMES + " justify-end"}>
        <AutoCompleteInput />
        {localStorage.getItem(IS_LOGGED_IN_KEY) === "1" || userNotLoggedIn ? (
          <UserPanel loading={loadingUser} user={user} />
        ) : (
          <AuthButtons />
        )}
      </section>
    </nav>
  );
};

export default PageHead;