import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

const Home = lazy(() => import("./Home"));
const VoterList = lazy(() => import("./VoterList"));
const VoterDetails = lazy(() => import("./VoterDetails"));
const VoterWithContext = lazy(() => import("./VoterWithContext"));
const VoterDetails2 = lazy(() => import("./VoterDetails2"));
const Drinks = lazy(() => import("./Drinks"));
const Login = lazy(() => import("./Login"));
const Logout = lazy(() => import("./Logout"));

function App() {
  const user = useContext(AuthContext);

  return (
    <>
      <HashRouter>
        <NavBar />
        <Suspense
          fallback={
            <div className="container">
              <h6 style={{ textAlign: "center" }}>Loading...</h6>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voter" element={<VoterList />} />
            <Route path="/voter/:voterid" element={<VoterDetails />} />
            <Route path="/voterwithcontext" element={<VoterWithContext />} />
            <Route
              path="/voterwithcontext/:voterid"
              element={<VoterDetails2 />}
            />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}

export default App;
