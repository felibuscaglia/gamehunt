import { UI_PATHS } from "lib/constants";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const UL_ELEMENTS = ["Home", "Topics", "Newsletter"];

const PageHead = () => {
  return (
    <nav className="border-b border-gray-100 p-4 mb-4 flex items-center justify-between">
      <section className="flex items-center gap-8">
        <Link to={UI_PATHS.HOME}>
          <Logo />
        </Link>
        <ul className="flex items-center gap-8">
          {UL_ELEMENTS.map((el) => (
            <li
              className="rounded hover:bg-gray-100 text-gray-500 py-1 px-2 cursor-pointer hover:text-gray-700 font-medium"
              key={`page-head-ul-element-${el}`}
            >
              {el}
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
};

export default PageHead;
