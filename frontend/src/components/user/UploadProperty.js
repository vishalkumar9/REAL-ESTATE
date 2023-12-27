import React from 'react'
import { ToastContainer } from 'react-toastify'
import UploadPropertyForm from '../form/UploadPropertyForm'

import './UploadProperty.css'

const UploadProperty = () => {
  return (
    <div className="user_main_div">
      <ToastContainer className="popup_message" />
        <div className="lower_div">
          <UploadPropertyForm />
        </div>
    </div>
  )
}

export default UploadProperty
