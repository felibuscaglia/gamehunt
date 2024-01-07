import { UI_PATHS } from "lib/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import SignUpScreen from "screens/SignUp";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<HomeScreen />} path={UI_PATHS.HOME} />
          <Route element={<SignUpScreen />} path={UI_PATHS.SIGN_UP} />
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
