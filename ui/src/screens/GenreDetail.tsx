import PageHead from "components/PageHead";
import SubgenreDetail from "components/SubgenreDetail";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, APP_NAME, UI_PATHS } from "lib/constants";
import { IGenre } from "lib/interfaces";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "./Loading";
import MetaTags from "components/MetaTags";

const GenreDetailScreen = () => {
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState<IGenre>();

  const { genreUrlSlug = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get<IGenre>(
        API_PATHS.GET_GENRE_BY_URL_SLUG.replace(":genreUrlSlug", genreUrlSlug)
      )
      .then(({ data }) => {
        if (data) {
          setGenre(data);
          setLoading(false);
        } else {
          throw new Error("Genre not found.");
        }
      })
      .catch((_) => navigate(UI_PATHS.NOT_FOUND));
  }, [genreUrlSlug]);

  if (loading || !genre) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <MetaTags
        description={`Explore the top-rated ${
          genre.name
        } games on ${APP_NAME}. Discover the best ${genre.name.toLowerCase()} games as voted by the community. Find new favorites and dive into the world of ${genre.name.toLowerCase()} gaming.`}
        title={`The best ${genre.name} games | ${APP_NAME}`}
      />
      <PageHead />
      <div className="w-10/12 mx-auto py-5">
        <h2 className="text-3xl font-semibold pb-10 text-primary-brand-color-medium">
          {genre.name} games
        </h2>
        <section className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-y-16">
          {(genre.subgenres || []).map((subgenre) => (
            <SubgenreDetail
              subgenre={subgenre}
              genreUrlSlug={genre.urlSlug}
              key={`subgenre-detail-${subgenre.id}`}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default GenreDetailScreen;
