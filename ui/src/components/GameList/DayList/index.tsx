import { IGame } from "lib/interfaces";
import Game from "./Game";
import { convertDateToUtc } from "lib/helpers";

interface IProps {
  games: IGame[];
  date: string;
}

const getFormattedDate = (inputDate: string): string => {
  const today = convertDateToUtc();
  const targetDate = convertDateToUtc(new Date(inputDate));
  const yesterday = convertDateToUtc();
  yesterday.setDate(today.getDate() - 1);

  if (targetDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (targetDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return targetDate.toLocaleDateString("en-US", { weekday: "long" });
  }
};

const GameDayList: React.FC<IProps> = ({ games, date }) => {
  return (
    <div>
      <section className="flex items-center justify-between">
        <p className="text-3xl flex items-center gap-2">
          <strong>{getFormattedDate(date)}</strong>
          <span className="text-primary-brand-color-light">March 13th</span>
        </p>
        <button className="text-primary-brand-color text-sm hover:underline">See all</button>
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
