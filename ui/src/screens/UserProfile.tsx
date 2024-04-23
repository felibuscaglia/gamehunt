import { IconUser } from "@tabler/icons-react";
import Game from "components/GameList/DayList/Game";
import PageHead from "components/PageHead";
import { apiClient } from "lib/axios/apiClient";
import {
  API_PATHS,
  APP_NAME,
  PRIMARY_BRAND_COLOR,
  UI_PATHS,
} from "lib/constants";
import { IUser } from "lib/interfaces";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store";
import LoadingScreen from "./Loading";
import MetaTags from "components/MetaTags";

const UserProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();

  const loadingLoggedUser = useAppSelector((state) => state.loading.user);
  const loggedUser = useAppSelector((state) => state.user.user);

  const { username = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get<IUser>(
        API_PATHS.GET_USER_PROFILE_BY_USERNAME.replace(":username", username)
      )
      .then(({ data }) => {
        if (data) {
          setUser(data);
        } else {
          throw new Error("User not found");
        }

        setLoading(false);
      })
      .catch((_) => navigate(UI_PATHS.NOT_FOUND));
  }, []);

  if (loading || !user || loadingLoggedUser) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MetaTags
        title={`${user.fullName}'s profile on ${APP_NAME} | ${APP_NAME}`}
        description={`Discover the latest video games liked by ${user.fullName} on ${APP_NAME}. `}
      />
      <main>
        <PageHead />
        <div className="w-11/12 sm:w-1/2 mx-auto flex flex-col gap-8">
          <div className="flex items-center sm:flex-row flex-col justify-between pt-5 sm:pb-5">
            <section className="flex items-center gap-4">
              {user.profilePicture?.url ? (
                <div
                  className="bg-center bg-cover h-14 w-14 sm:h-28 sm:w-28 bg-no-repeat rounded-full"
                  style={{
                    backgroundImage: `url('${user.profilePicture?.url}')`,
                  }}
                />
              ) : (
                <div className="flex items-center justify-center bg-primary-brand-color-light h-28 w-28 rounded-full">
                  <IconUser color={PRIMARY_BRAND_COLOR} size={50} />
                </div>
              )}
              <div>
                <h2 className="text-lg sm:text-2xl font-semibold">
                  {user.fullName}
                  <span className="font-normal ml-2 text-gray-400">
                    @{user.username}
                  </span>
                </h2>
                <p className="font-light font-lg text-gray-400">
                  {user.tagline}
                </p>
              </div>
            </section>
            {user.username === loggedUser?.username && (
              <Link
                className="bg-primary-brand-color text-white font-semibold rounded px-4 py-2 border border-primary-brand-color hover:text-primary-brand-color hover:bg-transparent sm:self-center self-end mt-2 sm:mt-0"
                to={UI_PATHS.USER_SETTINGS}
              >
                Edit profile
              </Link>
            )}
          </div>
          {user.about && (
            <div>
              <label className="text-sm text-gray-500 font-semibold">
                ABOUT
              </label>
              <div className="bg-gray-200 rounded p-6 mt-4">{user.about}</div>
            </div>
          )}
          <div>
            <label className="text-sm text-gray-500 font-semibold">POSTS</label>
            {user.games?.length ? (
              <section>
                {user.games.map((game) => (
                  <Game game={game} withUpvoteCount={false} />
                ))}
              </section>
            ) : (
              <p className="text-gray-400 text-sm italic w-full text-center py-8">
                Nothing here yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfileScreen;
