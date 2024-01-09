import AuthGuard from "guards/Auth";
import { IGame } from "lib/interfaces";

const GameSubmitScreen = () => {
  return (
    <AuthGuard<IGame> apiPath="hi!">
      {(draftGame) => <main>Game submission!</main>}
    </AuthGuard>
  );
};

export default GameSubmitScreen;
