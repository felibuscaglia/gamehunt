import { UI_PATHS } from "lib/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import SignUpScreen from "screens/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<HomeScreen />} path={UI_PATHS.HOME} />
        <Route element={<SignUpScreen />} path={UI_PATHS.SIGN_UP} />
      </Routes>
    </Router>
  );
};

export default App;
