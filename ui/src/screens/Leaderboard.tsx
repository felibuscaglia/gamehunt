import DayListGame from "components/GameList/DayList/Game";
import PageHead from "components/PageHead";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, UI_PATHS } from "lib/constants";
import { convertDateToUtc, formatDateAsString } from "lib/helpers";
import { IGame } from "lib/interfaces";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useSearchParams } from "react-router-dom";

const LeaderboardScreen = () => {
  const [index, setIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [games, setGames] = useState<IGame[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const DATE_PARAM = searchParams.get("date");

  const DATE = convertDateToUtc(
    DATE_PARAM ? new Date(DATE_PARAM) : undefined
  ).toISOString();

  const PATH = API_PATHS.GET_GAMES_BY_DAY.replace(":date", DATE).replace(
    ":limit",
    "20"
  );

  useEffect(() => {
    if (!searchParams.get("date")) {
      navigate(UI_PATHS.HOME);
    } else {
      fetchGames();
    }
  }, [searchParams]);

  const fetchGames = () => {
    apiClient
      .get<IGame[]>(`${PATH}&offset=${index}`)
      .then(({ data }) => {
        if (data.length) {
          setGames((prevGames) => prevGames.concat(data));
          setIndex(index + 1);
        }

        if(initialLoading) {
          setInitialLoading(false);
        }

        setHasMore(!!data.length);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <PageHead />
      <section className="w-10/12 mx-auto">
        {DATE_PARAM && (
          <p className="text-3xl flex items-center gap-2 mb-8">
            <strong>{formatDateAsString(DATE_PARAM)}</strong>
            <span className="text-primary-brand-color-light">March 13th</span>
          </p>
        )}
        {initialLoading ? (
          [...Array(8)].map((_, i) => (
            <Skeleton key={`loader-${i}`} height={56} className="mb-4" />
          ))
        ) : (
          <InfiniteScroll
            loader={[...Array(8)].map((_, i) => (
              <Skeleton key={`loader-${i}`} height={56} className="mb-4" />
            ))}
            hasMore={hasMore}
            next={fetchGames}
            dataLength={games.length}
          >
            {games.map((game, index) => (
              <DayListGame game={game} index={index} key={`game-${index}`} />
            ))}
          </InfiniteScroll>
        )}
      </section>
    </main>
  );
};

export default LeaderboardScreen;
