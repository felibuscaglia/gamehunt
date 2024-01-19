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
import { IAuthUser, IGenre } from "lib/interfaces";
import { useAppDispatch, useAppSelector } from "store";
import { addUser } from "store/features/userSlice";
import { loadGenres, loadUser } from "store/features/loadingSlice";
import { saveGenres } from "store/features/genresSlice";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

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
    console.log("I ENTER HERE!");
    apiClient
      .get<IGenre[]>(API_PATHS.GET_GENRES)
      .then(({ data: genres }) => {
        dispatch(saveGenres(genres));
        dispatch(loadGenres(false));
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
    <Routes>
      <Route element={<HomeScreen />} path={UI_PATHS.HOME} />
      <Route element={<SignUpScreen />} path={UI_PATHS.SIGN_UP} />
      <Route element={<LogInScreen />} path={UI_PATHS.LOGIN} />
      <Route element={<GameSubmitScreen />} path={UI_PATHS.SUBMIT_GAME} />
      <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_GENRES} />
      <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_SUBGENRES} />
    </Routes>
  );
};

export default App;
