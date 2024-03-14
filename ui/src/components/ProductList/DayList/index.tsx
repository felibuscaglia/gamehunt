import { IGame } from "lib/interfaces";
import Product from "./Product";

interface IProps {
  games: IGame[];
  date: string;
}

const getFormattedDate = (inputDate: string): string => {
  const today = new Date();
  const targetDate = new Date(inputDate);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (targetDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (targetDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return targetDate.toLocaleDateString("en-US", { weekday: "long" });
  }
};

const ProductDayList: React.FC<IProps> = ({ games, date }) => {
  return (
    <div>
      <p className="text-3xl flex items-center gap-2">
        <strong>{getFormattedDate(date)}</strong>
        <span className="text-primary-brand-color-light">March 13th</span>
      </p>
      <section className="mt-8 flex flex-col divide-y divide-y-primary-brand-color-extra-light">
        {games.map((game, i) => (
          <Product game={game} index={i} key={`game-${i}-${date}`} />
        ))}
      </section>
    </div>
  );
};

export default ProductDayList;
