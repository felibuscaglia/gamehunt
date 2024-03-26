import { IGame } from "lib/interfaces";
import Game from "./Game";
import { formatDateAsString } from "lib/helpers";
import { Link } from "react-router-dom";
import { UI_PATHS } from "lib/constants";

interface IProps {
  games: IGame[];
  date: string;
}

const GameDayList: React.FC<IProps> = ({ games, date }) => {
  return (
    <div>
      <section className="flex items-center justify-between">
        <p className="text-3xl flex items-center gap-2">
          <strong>{formatDateAsString(date)}</strong>
          <span className="text-primary-brand-color-light">March 13th</span>
        </p>
        <Link
          to={`${UI_PATHS.LEADERBOARD}?date=${date}`}
          className="text-primary-brand-color text-sm hover:underline"
        >
          See all
        </Link>
      </section>
      <section className="mt-8 flex flex-col divide-y divide-y-primary-brand-color-extra-light">
        {games.map((game, i) => (
          <Game game={game} index={i} key={`game-${i}-${date}`} />
        ))}
      </section>
    </div>
  );
};

export default GameDayList;
