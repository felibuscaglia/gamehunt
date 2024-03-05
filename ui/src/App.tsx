import { API_PATHS, UI_PATHS } from "lib/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import SignUpScreen from "screens/SignUp";
import LogInScreen from "screens/Login";
import GameSubmitScreen from "screens/GameSubmit";
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

const App = () => {
  const loadingUser = useAppSelector((state) => state.loading.user);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const axiosAuth = useAxiosAuth();

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
      axiosAuth
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
        <Route element={<GameSubmitScreen />} path={UI_PATHS.SUBMIT_GAME} />
        <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_GENRES} />
        <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_SUBGENRES} />
      </Routes>
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
