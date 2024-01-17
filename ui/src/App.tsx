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
import { IAuthUser } from "lib/interfaces";
import { useAppDispatch, useAppSelector } from "store";
import { addUser } from "store/features/userSlice";
import { loadUser } from "store/features/loadingSlice";

const App = () => {
  const loadingUser = useAppSelector((state) => state.loading.user);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const dispatchUser = (user: IAuthUser | null) => {
    dispatch(addUser(user));
    dispatch(loadUser(false));
  };

  useEffect(() => {
    console.log("I ENTER HERRE BEFORE!");
    if (!user && loadingUser) {
      console.log("I ENTER HERRE INSIDE!");
      apiClient
        .get<IAuthUser>(API_PATHS.GET_ME)
        .then(({ data }) => dispatchUser(data))
        .catch(() => dispatchUser(null));
    }
  }, [loadingUser, dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<HomeScreen />} path={UI_PATHS.HOME} />
          <Route element={<SignUpScreen />} path={UI_PATHS.SIGN_UP} />
          <Route element={<LogInScreen />} path={UI_PATHS.LOGIN} />
          <Route element={<GameSubmitScreen />} path={UI_PATHS.SUBMIT_GAME} />
          <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_GENRES} />
          <Route element={<AdminPortalScreen />} path={UI_PATHS.EDIT_USERS} />
        </Routes>
      </Router>
      <Toaster
        position="bottom-center"
        toastOptions={{
          error: {
            duration: 4000,
            style: { fontFamily: "var(--font-family)" },
          },
        }}
      />
    </>
  );
};

export default App;
