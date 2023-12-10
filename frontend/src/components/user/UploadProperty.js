import React from 'react'
import { ToastContainer } from 'react-toastify'
import UploadPropertyForm from '../form/UploadPropertyForm'

import './UploadProperty.css'

const UploadProperty = () => {
  return (
    <div className="user_main_div">
      <ToastContainer className="popup_message" />
      <div>
        <h1 className="headingText">UPLOAD PROPERTY</h1>
        <div className="lower_div">
          <UploadPropertyForm />
        </div>
      </div>
    </div>
  )
}

export default UploadProperty
