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
import { useAppDispatch } from "store";
import { addUser } from "store/features/userSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    apiClient
      .get<IAuthUser>(API_PATHS.GET_ME)
      .then(({ data }) => {
        dispatch(addUser(data));
      })
      .catch(() => dispatch(addUser(null)));
  }, [dispatch]);

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
