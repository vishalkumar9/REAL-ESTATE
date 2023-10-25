import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../context/AuthContext";


import "./MainNavigation.css";

import { useMediaQuery } from 'react-responsive'


const  MainNavigation = (props) => {

const AuthC = useContext(AuthContext);

    const navigate = useNavigate();
    const navLinks = props.routes;

    const [isClicked,setIsClicked] = useState(false);

    const isMobile = useMediaQuery({query:'(max-width:1224px)'});

    const handleClick = (event) =>{
        setIsClicked(!isClicked);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setIsClicked(false);
        navigate("register");
        AuthC.logout();
    }

    return(
        <nav className="navbar bg-body-tertiary fixed-top custom_theme_navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Real Estate</a>
                <button className="navbar-toggler custom_theme_navbar_btn" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end custom_theme_navbar" tabIndex="-1" id="offcanvasNavbar"
                     aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Real Estate</h5>
                        <button type="button" className="btn-close custom_theme_navbar_btn" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {props.routes.map((routeDetails) => (
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href={routeDetails.url}>{routeDetails.content}</a>
                                </li>
                            ))}
                            {AuthC.isLoggedIn && <li className="nav-item">
                                <a className="nav-link" aria-current="page" onClick={handleLogout}>Logout</a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default MainNavigation;