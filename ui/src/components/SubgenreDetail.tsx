import { UI_PATHS } from "lib/constants";
import { ISubgenre } from "lib/interfaces";
import { Link } from "react-router-dom";

interface IProps {
  subgenre: ISubgenre;
  genreUrlSlug: string;
}

const DESCRIPTION_CHARACTER_COUNT_LIMIT = 90;
const GAME_RENDER_LIMIT = 3;

const SubgenreDetail: React.FC<IProps> = ({ subgenre, genreUrlSlug }) => {
  return (
    <Link
      to={UI_PATHS.SUBGENRE_DETAIL.replace(
        ":genreUrlSlug",
        genreUrlSlug
      ).replace(":subgenreUrlSlug", subgenre.urlSlug)}
      className="flex flex-col gap-3"
    >
      <h3 className="text-2xl font-semibold">{subgenre.name}</h3>
      <p className="text-gray-500 text-sm">
        {subgenre.description.slice(0, DESCRIPTION_CHARACTER_COUNT_LIMIT)}
        {subgenre.description.length > DESCRIPTION_CHARACTER_COUNT_LIMIT && (
          <span>...</span>
        )}
      </p>
      <section className="flex items-center gap-2">
        {(subgenre.games || []).slice(0, GAME_RENDER_LIMIT).map((game) => (
          <div
            key={`subgenre-game-thumbnail-${game.id}`}
            className="h-8 w-8 rounded bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${game.thumbnail?.url}')` }}
          />
        ))}
        {(subgenre.games?.length || 0) - GAME_RENDER_LIMIT > 0 && (
          <span className="text-sm text-gray-500">
            +{(subgenre.games?.length || 0) - GAME_RENDER_LIMIT}
          </span>
        )}
      </section>
    </Link>
  );
};

export default SubgenreDetail;
