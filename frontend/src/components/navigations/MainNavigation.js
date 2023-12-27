import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import './MainNavigation.css'

import { useMediaQuery } from 'react-responsive'

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container">

          <a className="navbar-brand" href="/">REAL ESTATE</a>

          <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className=" sidebar offcanvas offcanvas-start" style={{background:"#011627"}} tabIndex="-1" id="offcanvasNavbar"
               aria-labelledby="offcanvasNavbarLabel">

            <div className="offcanvas-header text-white border-bottom">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel" >Real Estate</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center align-items-center fs-5  flex-grow-1 pe-3">
                <li className="nav-item mx-2">
                  <a className={AuthC.isLoggedIn ? "nav-link active" : "nav-link disabled"} aria-current="page" href={mypropertyUrl}>My Property</a>
                </li>
                <li className="nav-item mx-2">
                  <a className = {AuthC.isLoggedIn ? "nav-link active" : "nav-link disabled"} aria-current="page" href="/profile/uploadproperty">Upload Property</a>
                </li>
              </ul>
              <div className="d-flex justify-content-center align-items-center gap-3">
                {!AuthC.isLoggedIn && <a className="text-white text-decoration-none px-3 py-1 rounded-4" href="/register" style={{background:"#023e8a"}}>Sign up</a>}
                {AuthC.isLoggedIn && <a className="text-white text-decoration-none px-3 py-1 rounded-4" onClick={handleLogout} style={{background:"#023e8a"}}>Logout</a>}
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
}

export default MainNavigation
