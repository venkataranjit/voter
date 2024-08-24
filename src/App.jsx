import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Home from "./Home";
import VoterList from "./VoterList";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voter" element={<VoterList />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
