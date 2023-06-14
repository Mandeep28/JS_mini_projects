import React from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Gameplay from "./component/Gameplay/Gameplay";

function App() {
  return (
    <>
     
      <Routes>
        <Route path="/easygame" element={<Gameplay gameMode="easy"/>} />
        <Route path="/hardgame" element={<Gameplay gameMode="hard" />} />
        <Route path="/" element={<Home />} />\
      </Routes>
    </> 
    
  );
}

export default App;
