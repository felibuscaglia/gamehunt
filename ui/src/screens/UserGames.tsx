import MetaTags from "components/MetaTags";
import UserGame from "components/UserGame";
import AuthGuard from "guards/Auth";
import { API_PATHS, APP_DESCRIPTION, APP_TITLE, UI_PATHS } from "lib/constants";
import { IGame } from "lib/interfaces";
import { Link } from "react-router-dom";

const UserGamesScreen = () => {
  return (
    <>
      <MetaTags title={APP_TITLE} description={APP_DESCRIPTION} />
      <AuthGuard<IGame[]> apiPath={API_PATHS.GET_MY_GAMES}>
        {(games) => (
          <main className="w-10/12 mx-auto py-5">
            <h2 className="text-3xl font-bold col-span-3 mb-8">My games</h2>
            {games.length ? (
              <div className="flex items-start">
                <section className="w-full">
                  {games.map((game, i) => (
                    <UserGame game={game} key={`user-game-${i}`} />
                  ))}
                </section>
              </div>
            ) : (
              <div
                className="text-center text-lg inset-1/2 absolute w-full"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <p className="mb-4">
                  🤔 Looks like you haven't posted any games yet
                </p>
                <Link
                  to={UI_PATHS.SUBMIT_GAME}
                  className="text-sm bg-primary-brand-color text-white font-semibold py-2 px-4 rounded"
                >
                  Create a new game
                </Link>
              </div>
            )}
          </main>
        )}
      </AuthGuard>
    </>
  );
};

export default UserGamesScreen;
