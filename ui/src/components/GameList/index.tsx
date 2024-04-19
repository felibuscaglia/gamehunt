import { useState } from "react";
import DayList from "./DayList";
import InfiniteScroll from "react-infinite-scroll-component";
import { IGame, IGamesByDay } from "lib/interfaces";
import Skeleton from "react-loading-skeleton";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/constants";
import { convertDateToUtc } from "lib/helpers";

interface IProps {
  games: IGamesByDay;
  setGames: React.Dispatch<React.SetStateAction<IGamesByDay>>;
}

const GameList: React.FC<IProps> = ({ games, setGames }) => {
  const [hasMore, setHasMore] = useState(!!games.length);
  const [index, setIndex] = useState(1);

  const fetchProductsByDay = () => {
    const DATE = convertDateToUtc();
    DATE.setDate(DATE.getDate() - index);
    const FORMATTED_DATE = DATE.toISOString();

    apiClient
      .get<IGame[]>(
        API_PATHS.GET_GAMES_BY_DAY.replace(":date", FORMATTED_DATE).replace(
          ":limit",
          "20"
        )
      )
      .then(({ data }) => {
        setHasMore(!!data.length);
        setIndex((prevIndex) => prevIndex + 1);
        if (data.length) {
          setGames((prevGames) => ({
            ...prevGames,
            [FORMATTED_DATE]: data,
          }));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <InfiniteScroll
      dataLength={Object.keys(games).length}
      hasMore={hasMore}
      next={fetchProductsByDay}
      loader={[...Array(10)].map((_, i) => (
        <Skeleton key={`loader-${i}`} height={70} />
      ))}
      endMessage={
        <span className="mt-4 text-sm block text-center text-gray-500">
          {games.length ? "🎉 You've reached the end!" : "Nothing posted yet."}
        </span>
      }
      className="flex flex-col gap-8"
    >
      {Object.entries(games).map(([dateString, dayGames]) => (
        <DayList
          games={dayGames}
          date={dateString}
          key={`day-list-${dateString}`}
        />
      ))}
    </InfiniteScroll>
  );
};

export default GameList;
