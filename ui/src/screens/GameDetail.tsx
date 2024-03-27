import GameDetail from "components/GameDetail";
import PageHead from "components/PageHead";
import { apiClient } from "lib/axios/apiClient";
import {
  API_PATHS,
  PRIMARY_BRAND_COLOR,
  UI_PATHS,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IGame } from "lib/interfaces";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useAppSelector } from "store";

const GameDetailScreen = () => {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<IGame | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [userUpvoted, setUserUpvoted] = useState(false);

  const { gameUrlSlug = "" } = useParams();
  const navigate = useNavigate();
  const authApiClient = useAxiosAuth();

  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if(!loading) {
      setLoading(true);
    }
    
    apiClient
      .get<IGame>(
        API_PATHS.GET_GAME_BY_URL_SLUG.replace(":gameUrlSlug", gameUrlSlug)
      )
      .then(({ data }) => {
        if (!data) {
          throw new Error("Game not found");
        } else {
          setGame(data);
          setUpvoteCount(data.upvotes?.length || 0);
        }
      })
      .catch(() => navigate(UI_PATHS.NOT_FOUND))
      .finally(() => setLoading(false));
  }, [gameUrlSlug]);

  useEffect(() => {
    if (user && game) {
      setUserUpvoted(
        (game.upvotes || []).some((upvoter) => upvoter.email === user.email)
      );
    }
  }, [user, game]);

  const onUpvoteBtnClick = () => (userUpvoted ? downvote() : upvote());

  const upvote = () => {
    if (!user) {
      return navigate(
        `${UI_PATHS.LOGIN}?redirectUri=${window.location.pathname}`
      );
    }

    setUpvoteCount(upvoteCount + 1);
    setUserUpvoted(true);

    authApiClient
      .post<IGame>(API_PATHS.UPVOTE_GAME.replace(":gameId", game?.id || ""))
      .catch((err) =>
        toast.error(err.response?.data?.message || UNEXPECTED_ERROR_MSG)
      );
  };

  const downvote = () => {
    setUpvoteCount(upvoteCount - 1);
    setUserUpvoted(false);

    authApiClient
      .delete(API_PATHS.DOWNVOTE_GAME.replace(":gameId", game?.id || ""))
      .catch((err) =>
        toast.error(err.response?.data?.message || UNEXPECTED_ERROR_MSG)
      );
  };

  return (
    <main>
      <PageHead />
      {loading || !game ? (
        <PacmanLoader
          className="absolute inset-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
          color={PRIMARY_BRAND_COLOR}
        />
      ) : (
        <GameDetail
          onUpvoteBtnClick={onUpvoteBtnClick}
          game={game}
          userUpvoted={userUpvoted}
          upvoteCount={upvoteCount}
        />
      )}
    </main>
  );
};

export default GameDetailScreen;
