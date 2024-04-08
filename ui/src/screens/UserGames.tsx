import ConfirmDeleteDialog from "components/Dialog/ConfirmDeleteDialog";
import UserGame from "components/UserGame";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants";
import { IGame } from "lib/interfaces";
import { useState } from "react";

const UserGamesScreen = () => {
  return (
    <AuthGuard<IGame[]> apiPath={API_PATHS.GET_MY_GAMES}>
      {(games) => (
        <main className="w-10/12 mx-auto py-5">
          <h2 className="text-3xl font-bold col-span-3">My games</h2>
          <div className="mt-8 flex items-start">
            <section className="w-full">
              {games.map((game, i) => (
                <UserGame game={game} key={`user-game-${i}`} />
              ))}
            </section>
          </div>
        </main>
      )}
    </AuthGuard>
  );
};

export default UserGamesScreen;
