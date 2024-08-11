import Home from "./components/Home";
import Login from "./components/Login/Login";
import Predictions from "./components/Predictions";
import Schemes from "./components/Schemes";
import Signup from "./components/Signup/Signup";
import { Route, Routes } from "react-router-dom";
import { AppProvider } from "../src/context/context";
function App() {
  return (
    <>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/schemes" element={<Schemes />} />
          <Route exact path="/predictions" element={<Predictions />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
