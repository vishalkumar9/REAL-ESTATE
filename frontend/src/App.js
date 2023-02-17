import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import MainNavigation from "./components/navigations/MainNavigation";
import {Routes, Route} from "react-router-dom";

import Home from "./components/home/Home"
import UserAuthentication from "./components/authentication/UserAuthentication";
import About from "./components/about/About";
import {AuthContext} from "./components/context/AuthContext";
import UserProfile from "./components/user/UserProfile";

let logoutTimer;

function App() {

    const [token,setToken] = useState();
    const [userId,setUserId] = useState();
    const [userName,setUserName] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((userId,userName,token,expirationDate) => {
        setToken(token);
        setUserId(userId);
        setUserName(userName);

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

        setTokenExpirationDate(tokenExpirationDate);

        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId:userId,
                token:token,
                userName: userName,
                expiration: tokenExpirationDate.toISOString(),
            })
        )
        console.log(token);
    },[]);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
    },[]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(()=>{
        const storeData = JSON.parse(localStorage.getItem("userData"));
        if(storeData && storeData.token && new Date(storeData.expiration) > new Date()){
            login(storeData.userId,storeData.userName,storeData.token,new Date(storeData.expiration));
        }
        // console.log(Token);
    },[login]);


    const routes1 = [
        {
            content : "Home",
            url : "/"
        },
        {
            content : "About Us",
            url : "/aboutus"
        },
        {
            content : "Register",
            url : "/register"
        },
    ]
    const routes2 = [
        {
            content : "Home",
            url : "/"
        },
        {
            content : "About Us",
            url : "/aboutus"
        },
        {
            content: "Profile",
            url:"profile/user"
        },
        {
            content : "Logout",
        }
    ]

  return(
      <AuthContext.Provider value={{
          isLoggedIn:!!token,
          userId:userId,
          userName: userName,
          token: token,
          login:login,
          logout:logout,
      }}>
        <MainNavigation routes = {token ? routes2 : routes1}/>
            <Routes>
                <Route path="/register" element={<UserAuthentication/>}/>
                <Route path="/aboutus" element={<About/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/user" element = {<UserProfile/>}/>;
            </Routes>
      </AuthContext.Provider>
      );
}

export default App;
