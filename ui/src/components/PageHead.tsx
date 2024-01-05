import { IconDots } from "@tabler/icons-react";
import { UI_PATHS } from "lib/constants";
import { Link } from "react-router-dom";
import AutoCompleteInput from "./AutoCompleteInput";
import Logo from "./Logo";

const UL_ELEMENTS = ["Home", "Topics", "Newsletter", "Advertise", "About"];

const SECTION_CLASSNAMES = "flex items-center gap-6 w-1/3";
const BTN_CLASSNAMES =
  "hover:bg-gray-100 text-gray-500 py-1 px-2 cursor-pointer hover:text-gray-700";

const PageHead = () => {
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
        <Link
          className="text-gray-500 hover:text-primary-brand-color whitespace-nowrap"
          to={UI_PATHS.SIGN_IN}
        >
          Sign in
        </Link>
        <Link
          className="text-white bg-primary-brand-color rounded px-4 py-2 whitespace-nowrap"
          to={UI_PATHS.SIGN_UP}
        >
          Sign up
        </Link>
      </section>
    </nav>
  );
};

export default PageHead;
