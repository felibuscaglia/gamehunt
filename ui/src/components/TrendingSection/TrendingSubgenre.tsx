import { IconChevronRight } from "@tabler/icons-react";
import { UI_PATHS } from "lib/constants";
import { ISubgenre } from "lib/interfaces";
import { useState } from "react";
import { Link } from "react-router-dom";

const TrendingSubgenre: React.FC<ISubgenre> = ({ name, urlSlug, genre }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 justify-between sm:px-2 py-2 hover:bg-primary-brand-color-extra-light border-b border-b-gray-100 text-gray-500 hover:text-inherit"
      to={UI_PATHS.SUBGENRE_DETAIL.replace(":subgenreUrlSlug", urlSlug).replace(
        ":genreUrlSlug",
        genre?.urlSlug
      )}
    >
      <span className="text-sm">{name}</span>
      {hovered && <IconChevronRight stroke={1} size={20} />}
    </Link>
  );
};

export default TrendingSubgenre;
