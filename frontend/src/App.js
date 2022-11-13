import './App.css';
import React from "react";
import MainNavigation from "./components/navigations/MainNavigation";
import {Routes, Route} from "react-router-dom";

import Home from "./components/home/Home"
import UserAuthentication from "./components/authentication/UserAuthentication";

function App() {
  return(
      <>
        <MainNavigation/>
            <Routes>
                <Route path="/register" element={<UserAuthentication/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
      </>
      );
}

export default App;
