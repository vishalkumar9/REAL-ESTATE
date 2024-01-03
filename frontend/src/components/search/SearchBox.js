import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import './SearchBox.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'

const SearchBox = () => {
  const AuthC = useContext(AuthContext)
  const [location, setLocation] = useState("");
  const history = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
        const temp = location;
        if(temp.trim()==='')throw Error("location  or city cannot be empty");

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_PROPERTY_URL}/searchProperty/?location=${location}`)
        const responseData = await response.json()

        if (responseData.properties.length) {
          localStorage.setItem(
            'searchProperty',
            JSON.stringify({
              properties: responseData.properties,
            }),
          )
          history('/property')
        }
    } catch (err) {
      toast.error(err.message, { autoClose: 1000 })
    }
  }

    const handleChange = (e) =>{
        setLocation(e.target.value);
        handleSubmit();
    }


  return (
    <div className="search_box">
      <ToastContainer className="popup_message" />
      <form className="input_main_div">
        <input onChange={handleChange} placeholder="search by location or city"/>
        {
          <button
            className="active"
            onClick={handleSubmit}
          >
            {<FontAwesomeIcon icon={faSearch} />}
          </button>
        }
      </form>
    </div>
  )
}
export default SearchBox
