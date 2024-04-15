import PageHead from "components/PageHead";
import GameList from "components/GameList";
import TrendingSection from "components/TrendingSection";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/constants";
import { convertDateToUtc } from "lib/helpers";
import { IGame, IGamesByDay } from "lib/interfaces";
import { useEffect, useState } from "react";
import { useAppSelector } from "store";
import NewsletterSignup from "components/NewsletterSignup";

const HomeScreen = () => {
  const [gamesByDay, setGamesByDay] = useState<IGamesByDay>({});

  const USER = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const today = convertDateToUtc().toISOString();

    apiClient
      .get<IGame[]>(
        API_PATHS.GET_GAMES_BY_DAY.replace(":date", today).replace(
          ":limit",
          "20"
        )
      )
      .then(({ data }) => {
        if (data.length) {
          setGamesByDay((prevGames) => ({
            ...prevGames,
            [today]: data,
          }));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <PageHead />
      <section className="w-11/12 sm:w-10/12 mx-auto min-h-screen flex-grow">
        <TrendingSection />
        {USER && !USER.isSubscribedToNewsletter && (
          <NewsletterSignup user={USER} />
        )}
        <GameList games={gamesByDay} setGames={setGamesByDay} />
      </section>
    </main>
  );
};

export default HomeScreen;
