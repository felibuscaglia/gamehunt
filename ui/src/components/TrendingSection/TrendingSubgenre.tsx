import { IconChevronRight } from "@tabler/icons-react";
import { ISubgenre } from "lib/interfaces";
import { useState } from "react";
import { Link } from "react-router-dom";

const TrendingSubgenre: React.FC<ISubgenre> = ({ name }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 justify-between p-2 hover:bg-primary-brand-color-extra-light border-b border-b-gray-100 text-gray-500 hover:text-inherit"
      to="/"
    >
      <span className="text-sm">{name}</span>
      {hovered && <IconChevronRight stroke={1} size={20} />}
    </Link>
  );
};

export default TrendingSubgenre;
