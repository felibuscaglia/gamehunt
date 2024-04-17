import { Transition } from "@headlessui/react";
import { PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useAppSelector } from "store";

const PageHeadPopover = () => {
  const [display, setDisplay] = useState(false);
  const [mouseEnteredList] = useState(false);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);

  const genres = useAppSelector((state) => state.genres?.genres);
  const loadingGenres = useAppSelector((state) => state.loading.genres);

  let timeoutId: NodeJS.Timeout;

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      if (!mouseEnteredList) {
        setDisplay(false);
      }
    }, 150);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
  };

  const SELECTED_GENRE = genres[selectedGenreIndex];

  return (
    <div className="relative">
      <span
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={handleMouseLeave}
        className="rounded hover:bg-gray-100 text-gray-500 py-1 px-2 cursor-pointer hover:text-gray-700"
      >
        Genres
      </span>
      <Transition
        show={display}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <section
          className={`absolute ${
            loadingGenres
              ? "w-56 flex items-center justify-center"
              : "w-[500px]"
          } min-h-60 mt-3 z-10 p-4 rounded-lg bg-white flex`}
          style={{ boxShadow: "rgba(33, 41, 60, .1) 0 0 8px 1px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {loadingGenres ? (
            <PacmanLoader color={PRIMARY_BRAND_COLOR} size={15} />
          ) : (
            <>
              <div className="w-1/3 border-r border-r-slate-100 pr-4">
                {genres.map(({ name, urlSlug }, i) => (
                  <Link
                    to={UI_PATHS.GENRE_DETAIL.replace(":genreUrlSlug", urlSlug)}
                    key={`popover-genre-${name}`}
                    onMouseEnter={() => setSelectedGenreIndex(i)}
                    className="rounded block text-sm p-2 text-gray-500 hover:bg-slate-100 cursor-pointer font-light"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <div className="w-2/3 px-4 py-2">
                <h6 className="font-semibold text-gray-700 text-sm">
                  {SELECTED_GENRE?.name}
                </h6>
                <section className="grid grid-cols-2 mt-2">
                  {(SELECTED_GENRE?.subgenres || []).map(
                    ({ name, urlSlug }) => (
                      <Link
                        to={UI_PATHS.SUBGENRE_DETAIL.replace(
                          ":subgenreUrlSlug",
                          urlSlug
                        ).replace(":genreUrlSlug", SELECTED_GENRE.urlSlug)}
                        className="text-sm font-light py-2 text-gray-500 hover:underline"
                        key={`subgenre-${name}`}
                      >
                        {name}
                      </Link>
                    )
                  )}
                </section>
              </div>
            </>
          )}
        </section>
      </Transition>
    </div>
  );
};

export default PageHeadPopover;
