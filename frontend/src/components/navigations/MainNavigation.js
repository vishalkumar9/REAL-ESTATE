import React, {useState} from "react";
import logo from "../image/logo.svg"
import {Link} from "react-router-dom";
import "./MainNavigations.css";
import { useMediaQuery } from 'react-responsive'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faBars} from "@fortawesome/free-solid-svg-icons";

const  MainNavigation = () => {

    const navLinks = [
        {
            content : "Home",
            url : "/"
        },
        {
            content : "About",
            url : "/About"
        },
        {
            content : "Search",
            url : "/search"
        },
        {
            content : "Register",
            url : "/register"
        },
    ]

    const [isClicked,setIsClicked] = useState(false);

    const isMobile = useMediaQuery({query:'(max-width:1224px)'});

    const handleClick = (event) =>{
        setIsClicked(!isClicked);
    }


    if(isMobile){
        return (
            <div className="main-navi-div">
                <nav>
                    <div>
                        <img src = {logo}/>
                    </div>
                    <div>
                        <ul className={isClicked ? "navbar active" : "navbar"}>
                            {navLinks.map((item,i)=>(
                                <li key = {i} className={!i && "active"}>
                                    <Link to={item.url}>{item.content}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mobile">
                        <div onClick={handleClick}>
                            {!isClicked ? <FontAwesomeIcon icon={faBars}/> : <FontAwesomeIcon icon={faXmark}/>}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    else {
        return (
            <div>
                <nav>
                    <div>
                        <img src = {logo}/>
                    </div>
                    <div>
                        <ul className="navbar">
                            {navLinks.map((item,i)=>(
                                <li key = {i} className={!i && "active"}>
                                    <Link to={item.url}>{item.content}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default MainNavigation;