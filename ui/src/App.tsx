import { API_PATHS, UI_PATHS } from "lib/constants";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import SignUpScreen from "screens/SignUp";
import LogInScreen from "screens/Login";
import GameFormScreen from "screens/GameForm";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import AdminPortalScreen from "screens/AdminPortal";
import { useEffect } from "react";
import { apiClient } from "lib/axios/apiClient";
import { IAuthUser, IGenre, ISubgenre } from "lib/interfaces";
import { useAppDispatch, useAppSelector } from "store";
import { addUser } from "store/features/userSlice";
import {
  loadGenres,
  loadSubgenres,
  loadUser,
} from "store/features/loadingSlice";
import { saveGenres } from "store/features/genresSlice";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { saveSubgenres } from "store/features/subgenresSlice";
import GameDetailScreen from "screens/GameDetail";
import UserSettingsScreen from "screens/UserSettings";
import UserProfileScreen from "screens/UserProfile";
import GenreDetailScreen from "screens/GenreDetail";
import SubgenreDetailScreen from "screens/SubgenreDetail";
import LeaderboardScreen from "screens/Leaderboard";
import UserGamesScreen from "screens/UserGames";
import ErrorScreen from "screens/Error";
import NotificationsScreen from "screens/Notifications";
import ResetPasswordScreen from "screens/ResetPassword";
import ChangePasswordScreen from "screens/ChangePassword";
import { HttpStatusCode } from "axios";
import ConfirmEmailScreen from "screens/ConfirmEmail";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  const loadingUser = useAppSelector((state) => state.loading.user);
  const user = useAppSelector((state) => state.user?.user);
  const dispatch = useAppDispatch();

  const authApiClient = useAxiosAuth();

  const dispatchUser = (user: IAuthUser | null) => {
    dispatch(addUser(user));
    dispatch(loadUser(false));
  };

  useEffect(() => {
    apiClient
      .get<IGenre[]>(API_PATHS.GET_GENRES_WITH_SUBGENRES)
      .then(({ data: genres }) => {
        dispatch(saveGenres(genres));
        dispatch(loadGenres(false));
      })
      .catch((err) => console.error(err));

    apiClient
      .get<ISubgenre[]>(API_PATHS.GET_SUBGENRES)
      .then(({ data: subGenres }) => {
        dispatch(saveSubgenres(subGenres));
        dispatch(loadSubgenres(false));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  useEffect(() => {
    if (!user && loadingUser) {
      authApiClient
        .get<IAuthUser>(API_PATHS.GET_ME)
        .then(({ data }) => dispatchUser(data))
        .catch(() => dispatchUser(null));
    }
  }, [loadingUser, dispatch]);

  return (
    <>
      <Routes>
        <Route element={<HomeScreen />} path={UI_PATHS.HOME} />
        <Route element={<SignUpScreen />} path={UI_PATHS.SIGN_UP} />
        <Route element={<LogInScreen />} path={UI_PATHS.LOGIN} />
        <Route element={<GameFormScreen />} path={UI_PATHS.SUBMIT_GAME} />
        <Route
          element={<GameFormScreen isEditMode />}
          path={UI_PATHS.EDIT_USER_GAME}
        />
        <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_GENRES} />
        <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_SUBGENRES} />
        <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_PLATFORMS} />
        <Route element={<GameDetailScreen />} path={UI_PATHS.GAME_DETAIL} />
        <Route element={<UserSettingsScreen />} path={UI_PATHS.USER_SETTINGS} />
        <Route element={<UserProfileScreen />} path={UI_PATHS.USER_PROFILE} />
        <Route element={<GenreDetailScreen />} path={UI_PATHS.GENRE_DETAIL} />
        <Route element={<LeaderboardScreen />} path={UI_PATHS.LEADERBOARD} />
        <Route element={<UserGamesScreen />} path={UI_PATHS.USER_GAMES} />
        <Route
          element={<SubgenreDetailScreen />}
          path={UI_PATHS.SUBGENRE_DETAIL}
        />
        <Route
          element={<AdminPortalScreen />}
          path={UI_PATHS.EDIT_GAME_MODES}
        />
        <Route
          element={<NotificationsScreen />}
          path={UI_PATHS.NOTIFICATIONS}
        />
        <Route
          element={<ResetPasswordScreen />}
          path={UI_PATHS.RESET_PASSWORD}
        />
        <Route
          element={<ChangePasswordScreen />}
          path={UI_PATHS.CHANGE_PASSWORD}
        />
        <Route element={<ConfirmEmailScreen />} path={UI_PATHS.CONFIRM_EMAIL} />
        <Route
          element={<ErrorScreen status={HttpStatusCode.NotFound} />}
          path={UI_PATHS.NOT_FOUND}
        />
        <Route
          element={<ErrorScreen status={HttpStatusCode.NotFound} />}
          path="*"
        />
      </Routes>
      <Toaster position="bottom-center" />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;
