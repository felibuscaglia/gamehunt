import { UI_PATHS } from "lib/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<HomeScreen />} path={UI_PATHS.HOME} />
      </Routes>
    </Router>
  );
};

export default App;
