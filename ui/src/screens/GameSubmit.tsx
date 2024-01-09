import GameSubmitForm from "components/GameSubmitForm";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants";
import { IGame } from "lib/interfaces";

const GameSubmitScreen = () => {
  return (
    <AuthGuard<IGame> apiPath={API_PATHS.SUBMIT_GAME} method="POST">
      {(draftGame) => <GameSubmitForm game={draftGame} />}
    </AuthGuard>
  );
};

export default GameSubmitScreen;
