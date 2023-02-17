import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";

// third party import
import { useMediaQuery } from 'react-responsive'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faBars} from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';

// import from file
import {AuthContext} from "../context/AuthContext";
import logo from "../image/logo.svg"

// CSS FILE
import "./MainNavigations.css";



const  MainNavigation = (props) => {

const AuthC =useContext(AuthContext);

    const navLinks = props.routes;

    const [isClicked,setIsClicked] = useState(false);

    const isMobile = useMediaQuery({query:'(max-width:1224px)'});

    const handleClick = (event) =>{
        setIsClicked(!isClicked);
    }


    if(isMobile){
        return (
            <Dropdown>
            <div className="main-navi-div">
                <nav>
                    <div>
                        <img src = {logo}/>
                    </div>
                    <div>
                        <ul className={isClicked ? "navbar active" : "navbar"}>
                            {navLinks.map((item,i)=>(
                                <li key = {i} className={!i && "active"}>
                                    { item.content==="Logout" &&  <Link onClick = {AuthC.logout}>{item.content}</Link> }
                                    { item.content!=="Logout" &&  <Link to={item.url}>{item.content}</Link> }
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
            </Dropdown>
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
                                    { item.content==="Logout" &&  <Link onClick = {AuthC.logout}>{item.content}</Link> }
                                    { item.content!=="Logout" && <Link to={item.url}>{item.content}</Link> }
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