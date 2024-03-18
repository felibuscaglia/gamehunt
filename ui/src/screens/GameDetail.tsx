import GameDetail from "components/GameDetail";
import PageHead from "components/PageHead";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { IGame } from "lib/interfaces";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const GameDetailScreen = () => {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<IGame | null>(null);

  const { gameUrlSlug = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get<IGame>(
        API_PATHS.GET_GAME_BY_URL_SLUG.replace(":gameUrlSlug", gameUrlSlug)
      )
      .then(({ data }) => {
        if (!data) {
          throw new Error("Game not found");
        } else {
          setGame(data);
        }
      })
      .catch(() => navigate(UI_PATHS.NOT_FOUND))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <PageHead />
      {loading || !game ? (
        <PacmanLoader
          className="fixed inset-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
          color={PRIMARY_BRAND_COLOR}
        />
      ) : (
        <GameDetail game={game} />
      )}
    </main>
  );
};

export default GameDetailScreen;
