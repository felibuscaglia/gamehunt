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
  const [DATE_DIFF, ...REST] = (formatDateAsString(date) || '').split(' ');
  return (
    <div>
      <section className="flex items-center justify-between">
        <p className="text-3xl flex items-center gap-2">
          <strong>{DATE_DIFF}</strong>
          <span className="text-primary-brand-color-light">{REST.join(' ')}</span>
        </p>
        <Link
          to={`${UI_PATHS.LEADERBOARD}?date=${date}`}
          className="text-primary-brand-color text-sm hover:underline"
        >
          See all
        </Link>
      </section>
      <section className="mt-4 flex flex-col">
        {games.map((game, i) => (
          <Game game={game} index={i} key={`game-${i}-${date}`} />
        ))}
      </section>
    </div>
  );
};

export default GameDayList;
