import { ISubgenre } from "lib/interfaces";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import TrendingSubgenre from "./TrendingSubgenre";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS } from "lib/constants";

const TrendingSection = () => {
  const [trendingSubgenres, setTrendingSubgenres] = useState<ISubgenre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<ISubgenre[]>(API_PATHS.GET_TRENDING_SUBGENRES)
      .then(({ data }) => {
        setTrendingSubgenres(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full py-8">
      <span className="text-sm font-medium text-gray-500">
        TRENDING
      </span>
      <section className={`grid grid-cols-4 ${loading ? 'gap-4' : 'gap-x-8'} mt-2`}>
        {loading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} height={51} />
            ))}
          </>
        ) : (
          <>
            {trendingSubgenres.map((subgenre, i) => (
              <TrendingSubgenre {...subgenre} key={`trending-subgenre-${i}`} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default TrendingSection;
