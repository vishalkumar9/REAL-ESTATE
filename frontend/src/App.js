import React, { useCallback, useEffect, useState, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/home/Home'
import { AuthContext } from './components/context/AuthContext'
import './App.css'
import PropertyDisplay from './components/property/PropertyDisplay'
import LoadingSpinner from './components/spinner/LoadingSpinner'
import UploadProperty from './components/user/UploadProperty'
import UserProperty from './components/user/UserProperty'
import PropertyView from "./components/property/PropertyView";

const About = React.lazy(() => import('./components/about/About'))
const UserAuthentication = React.lazy(
  () => import('./components/authentication/UserAuthentication'),
)
const UserProfile = React.lazy(() => import('./components/user/UploadProperty'))
const MainNavigation = React.lazy(
  () => import('./components/navigations/MainNavigation'),
)
let logoutTimer

function App() {
  const [userEmail, setUserEmail] = useState()
  const [token, setToken] = useState()
  const [userId, setUserId] = useState()
  const [userName, setUserName] = useState()
  const [tokenExpirationDate, setTokenExpirationDate] = useState()

  const login = useCallback(
    (userId, userName, userEmail, token, expirationDate) => {
      setToken(token)
      setUserId(userId)
      setUserName(userName)
      setUserEmail(userEmail)

      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24)

      setTokenExpirationDate(tokenExpirationDate)

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: userId,
          token: token,
          userName: userName,
          userEmail: userEmail,
          expiration: tokenExpirationDate.toISOString(),
        }),
      )
    },
    [],
  )

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserName(null)
    setUserEmail(null)
    setTokenExpirationDate(null)
    localStorage.removeItem('userData')
    localStorage.removeItem('searchProperty')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('userData'))
    if (
      storeData &&
      storeData.token &&
      new Date(storeData.expiration) > new Date()
    ) {
      login(
        storeData.userId,
        storeData.userName,
        storeData.userEmail,
        storeData.token,
        new Date(storeData.expiration),
      )
    }
  }, [login])


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        userName: userName,
        token: token,
        userEmail: userEmail,
        login: login,
        logout: logout,
      }}
    >
        <MainNavigation/>
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
            {!!token && <Route path="/profile/uploadproperty" element={<UploadProperty />} />}
            {!!token && <Route path="/profile/user/:userId" element={<UserProperty />} />}
          <Route path="/property/:propertyId" element={<PropertyView/>}></Route>
          <Route path="/property" element={<PropertyDisplay />} />
          <Route path="/register" element={<UserAuthentication />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </AuthContext.Provider>
  )
}

export default App
