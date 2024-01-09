import { UI_PATHS } from "lib/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import SignUpScreen from "screens/SignUp";
import { Toaster } from "react-hot-toast";
import LogInScreen from "screens/Login";

import 'react-loading-skeleton/dist/skeleton.css';
import GameSubmitScreen from "screens/GameSubmit";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<HomeScreen />} path={UI_PATHS.HOME} />
          <Route element={<SignUpScreen />} path={UI_PATHS.SIGN_UP} />
          <Route element={<LogInScreen />} path={UI_PATHS.LOGIN} />
          <Route element={<GameSubmitScreen />} path={UI_PATHS.SUBMIT_GAME} />
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
