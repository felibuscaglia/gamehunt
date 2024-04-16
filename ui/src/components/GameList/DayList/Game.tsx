import { IconChevronUp } from "@tabler/icons-react";
import { UI_PATHS } from "lib/constants";
import { IGame } from "lib/interfaces";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface IProps {
  game: IGame;
  index?: number;
  withUpvoteCount?: boolean;
}

const DayListGame: React.FC<IProps> = ({
  index,
  game,
  withUpvoteCount = true,
}) => {
  const GAME_SUBGENRES = game.subgenres || [];

  return (
    <Link
      to={UI_PATHS.GAME_DETAIL.replace(":gameUrlSlug", game.urlSlug || "")}
      className="px-2 py-4 w-full flex items-center justify-between day-list-game rounded"
    >
      <section className="flex items-center gap-2">
        {index !== undefined && (
          <strong className="text-lg sm:text-3xl text-primary-brand-color-light">
            #{index + 1}
          </strong>
        )}
        <div
          className=" min-w-8 min-h-8 sm:min-w-12 sm:min-h-12 bg-center bg-cover bg-no-repeat h-8 w-8 sm:h-12 sm:w-12 rounded"
          style={{
            backgroundImage: `url('${game.thumbnail?.url}')`,
          }}
        />
        <div>
          <p className="flex gap-1 flex-col sm:flex-row sm:items-center items-start">
            <strong>{game.name}</strong>
            {game.tagline && (
              <>
                <p className="text-gray-600 text-sm sm:text-base sm:inline hidden">
                  —&nbsp;
                  {game.tagline}
                </p>
              </>
            )}
          </p>
          <div className="flex items-center text-gray-400 text-xs mt-px">
            {GAME_SUBGENRES.map(({ name }, i) => (
              <div key={`game-subgenre-${index}-${i}`}>
                <span className="text-gray-400">{name}</span>
                {i !== GAME_SUBGENRES.length - 1 && (
                  <span className="text-gray-300 mx-2">&#8226;</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {withUpvoteCount ? (
        <div className="text-gray-700 min-h-12 min-w-12 h-12 w-12 flex-col flex items-center justify-center rounded border border-gray-100">
          <IconChevronUp stroke={1.5} />
          <span className="text-xs font-semibold">
            {game.upvotes?.length || 0}
          </span>
        </div>
      ) : (
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {dayjs(game.postedAt).format("MMM YYYY")}
        </span>
      )}
    </Link>
  );
};

export default DayListGame;
