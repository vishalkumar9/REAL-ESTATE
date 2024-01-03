import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import './MainNavigation.css'

import { useMediaQuery } from 'react-responsive'
import {color} from "@chakra-ui/react";

const MainNavigation = () => {
  const AuthC = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    navigate('register')
    AuthC.logout()
  }

  const mypropertyUrl = `/profile/user/${AuthC.userId}`;


  return (
      <nav className="navbar bg-transparent navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{color:"Black"}}>Real Estate</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
               aria-labelledby="offcanvasNavbarLabel" style={{background:"#94a3b8"}}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Real Estate</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active text-start" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-start" href="/aboutus">About</a>
                </li>
                {AuthC.isLoggedIn && <li className="nav-item dropdown text-start">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                     aria-expanded="false">
                    Property
                  </a><ul className="dropdown-menu text-start bg-light">
                    <li><a className="dropdown-item" href={mypropertyUrl} style={{background: "transparent"}}>My Property</a></li>
                    <li>
                      <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" href="/profile/uploadproperty" style={{background: "transparent"}}>Upload Property</a>
                    </li>
                  </ul>
                </li>
                }
              </ul>
              {!AuthC.isLoggedIn && <a className="navbar-brand" href="/register" style={{color:"Black"}}>Login</a>}
              {AuthC.isLoggedIn && <a className="navbar-brand" href="/" onClick={handleLogout} style={{color:"Black"}}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
  );
}

export default MainNavigation
