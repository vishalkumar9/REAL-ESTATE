import React, {useCallback, useEffect, useState} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";

import MainNavigation from "./components/navigations/MainNavigation";
import UserProfile from "./components/user/UserProfile";
import Home from "./components/home/Home"
import UserAuthentication from "./components/authentication/UserAuthentication";
import About from "./components/about/About";
import {AuthContext} from "./components/context/AuthContext";

import './App.css';
import PropertyDisplay from "./components/property/PropertyDisplay";

let logoutTimer;

function App() {

    const [userEmail, setUserEmail] = useState();
    const [token,setToken] = useState();
    const [userId,setUserId] = useState();
    const [userName,setUserName] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            window.location.reload();
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth,windowHeight]);



    const login = useCallback((userId,userName,userEmail,token,expirationDate) => {
        setToken(token);
        setUserId(userId);
        setUserName(userName);
        setUserEmail(userEmail);

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

        setTokenExpirationDate(tokenExpirationDate);

        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId:userId,
                token:token,
                userName: userName,
                userEmail: userEmail,
                expiration: tokenExpirationDate.toISOString(),
            })
        )
        console.log(token);
    },[]);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserName(null);
        setUserEmail(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
        localStorage.removeItem("searchProperty");
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
        if(storeData && storeData.token && new Date(storeData.expiration) > new Date()) {
            login(storeData.userId, storeData.userName,storeData.userEmail, storeData.token, new Date(storeData.expiration));
        }
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
            url:"/profile/user/"+userId,
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
          userEmail: userEmail,
          login:login,
          logout:logout,
      }}>
        <MainNavigation routes = {token ? routes2 : routes1}/>
            <Routes>
                <Route path="/profile/user/:userId" element = {<UserProfile/>}/>
                <Route path="/property/*" element = {<PropertyDisplay/>}/>
                <Route path="/register" element={<UserAuthentication/>}/>
                <Route path="/aboutus" element={<About/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
      </AuthContext.Provider>
      );
}

export default App;
