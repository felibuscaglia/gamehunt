import Game from "components/GameList/DayList/Game";
import PageHead from "components/PageHead";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, APP_NAME, UI_PATHS } from "lib/constants";
import { ISubgenre } from "lib/interfaces";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "./Loading";
import MetaTags from "components/MetaTags";

const SubgenreDetailScreen = () => {
  const [loading, setLoading] = useState(true);
  const [subgenre, setSubgenre] = useState<ISubgenre>();

  const { genreUrlSlug = "", subgenreUrlSlug = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get<ISubgenre>(
        API_PATHS.GET_SUBGENRE_BY_URL_SLUG.replace(
          ":subgenreUrlSlug",
          subgenreUrlSlug
        ).replace(":genreUrlSlug", genreUrlSlug)
      )
      .then(({ data }) => {
        if (data) {
          setSubgenre(data);
          setLoading(false);
        } else {
          throw new Error("Subgenre not found");
        }
      })
      .catch(() => navigate(UI_PATHS.NOT_FOUND));
  }, [subgenreUrlSlug, genreUrlSlug]);

  if (loading || !subgenre) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <MetaTags
        description={`Explore the top-rated ${
          subgenre.name
        } games on ${APP_NAME}. Discover the best ${subgenre.name.toLowerCase()} games as voted by the community. Find new favorites and dive into the world of ${subgenre.name.toLowerCase()} gaming.`}
        title={`The best ${subgenre.name} games | ${APP_NAME}`}
      />
      <PageHead />
      <div className="w-11/12 sm:w-10/12 mx-auto py-5">
        <h2 className="text-2xl sm:text-3xl font-semibold pb-5 sm:pb-10 text-primary-brand-color-medium sm:text-left text-center">
          {subgenre.name} games
        </h2>
        <section className="flex items-start gap-8">
          <div className="sm:w-9/12">
            {(subgenre.games || []).map((game, i) => (
              <Game index={i} game={game} key={`subgenre-game-${game.id}`} />
            ))}
          </div>
          <div className="w-3/12 py-3 sm:block hidden">
            <label className="uppercase text-xs font-semibold text-gray-500 mb-8">
              {subgenre.genre?.name}
            </label>
            <section>
              {(subgenre.genre.subgenres || []).map((sg) => (
                <Link
                  className="text-sm text-gray-500"
                  key={`genre-subgenre-${sg.id}`}
                  to={UI_PATHS.SUBGENRE_DETAIL.replace(
                    ":genreUrlSlug",
                    genreUrlSlug
                  ).replace(":subgenreUrlSlug", sg.urlSlug)}
                >
                  {sg.name}
                </Link>
              ))}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SubgenreDetailScreen;
