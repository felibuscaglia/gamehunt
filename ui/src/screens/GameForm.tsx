import GameForm from "components/GameForm";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants";
import { IGame } from "lib/interfaces";
import { useParams } from "react-router-dom";

interface IProps {
  isEditMode?: boolean;
}

const GameFormScreen: React.FC<IProps> = ({ isEditMode = false }) => {
  const { gameId = "" } = useParams();
  return (
    <AuthGuard<IGame>
      apiPath={
        isEditMode
          ? API_PATHS.GET_DRAFT_GAME.replace(":gameId", gameId)
          : API_PATHS.SUBMIT_GAME
      }
      method={isEditMode ? "GET" : "POST"}
    >
      {(game) => <GameForm game={game} />}
    </AuthGuard>
  );
};

export default GameFormScreen;
