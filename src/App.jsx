import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import React, {Lazy, Suspense} from 'react';
const Home = lazy(()=> import('./Home'));
const VoterList = lazy(()=> import('./VoterList'))
const VoterWithContext = lazy(()=> import('./VoterWithContext'))
const Drinks = lazy(()=> import('./drinks'))

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Suspense fallback={<div className="container"><h6 style={{textAlign:"center"}}>Loading...</h6></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voter" element={<VoterList />} />
          <Route path="/voterwithcontext" element={<VoterWithContext />} />
          <Route path="/drinks" element={<Drinks />} />
        </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}

export default App;
