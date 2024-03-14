import PageHead from "components/PageHead";
import ProductList from "components/ProductList";
import TrendingSection from "components/TrendingSection";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/constants";
import { IGame, IGamesByDay } from "lib/interfaces";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [gamesByDay, setGamesByDay] = useState<IGamesByDay>({});

  useEffect(() => {
    const today = new Date().toISOString();

    apiClient
      .get<IGame[]>(API_PATHS.GET_GAMES_BY_DAY.replace(":date", today))
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
      <section className="w-10/12 mx-auto min-h-screen flex-grow">
        <TrendingSection />
        <div id="productList" className="h-full">
          <ProductList
            games={gamesByDay}
            setGames={setGamesByDay}
          />
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
