import PageHead from "components/PageHead";
import SubgenreDetail from "components/SubgenreDetail";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { IGenre } from "lib/interfaces";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

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

  return (
    <main>
      <PageHead />
      {loading || !genre ? (
        <PacmanLoader
          className="absolute inset-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
          color={PRIMARY_BRAND_COLOR}
        />
      ) : (
        <div className="w-10/12 mx-auto py-5">
          <h2 className="text-4xl font-semibold pb-5">{genre.name} games</h2>
          <section className="grid grid-cols-3 gap-y-16">
            {(genre.subgenres || []).map((subgenre) => (
              <SubgenreDetail
                subgenre={subgenre}
                genreUrlSlug={genre.urlSlug}
                key={`subgenre-detail-${subgenre.id}`}
              />
            ))}
          </section>
        </div>
      )}
    </main>
  );
};

export default GenreDetailScreen;
