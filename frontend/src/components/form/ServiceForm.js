import React, { useState } from 'react'
import './ServiceForm.css'

const ServiceForm = (props) => {
  const [serviceRequestDetail, setServiceRequestDetail] = useState({
    phno: '',
    serviceDetail: '',
    address: '',
    selectedService: props.Service,
  })

  const [errors, setErrors] = useState({
    phnoError: '',
    serviceDetailError: '',
    addressError: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setServiceRequestDetail({
      ...serviceRequestDetail,
      [name]: value,
    })
    setErrors({
      ...errors,
      [`${name}Error`]: '',
    })
  }

  const validateFields = () => {
    let isValid = true
    const { phno, serviceDetail, address } = serviceRequestDetail
    const errorsCopy = {
      phnoError: '',
      serviceDetailError: '',
      addressError: '',
    }

    if (!phno.trim()) {
      errorsCopy.phnoError = 'Phone number is required.'
      isValid = false
    } else if (!/^\d{10}$/.test(phno)) {
      errorsCopy.phnoError = 'Phone number is invalid.'
      isValid = false
    }

    if (!serviceDetail.trim()) {
      errorsCopy.serviceDetailError = 'Service detail is required.'
      isValid = false
    }

    if (!address.trim()) {
      errorsCopy.addressError = 'Address is required.'
      isValid = false
    }

    setErrors(errorsCopy)
    return isValid
  }

  const handleServiceRequest = (e) => {
    e.preventDefault()
    if (validateFields()) {
      console.log(serviceRequestDetail)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleServiceRequest} className="uploadForm_div">
        <h1>Fill This Form for {props.Service} Service</h1>
        <div className="form_input_div">
          <span style={{ color: 'red', fontSize: 'large' }}>*</span>
          <label>Description</label>
          <div className="option">
            <textarea name="serviceDetail" onChange={handleChange} />
            {errors.serviceDetailError && (
              <span style={{ color: 'red' }} className="error">
                {errors.serviceDetailError}
              </span>
            )}
          </div>
        </div>
        <div className="form_input_div">
          <span style={{ color: 'red', fontSize: 'large' }}>*</span>
          <label>Service Address</label>
          <div className="option">
            <textarea name="address" onChange={handleChange} />
            {errors.addressError && (
              <span style={{ color: 'red' }} className="error">
                {errors.addressError}
              </span>
            )}
          </div>
        </div>
        <div className="form_input_div">
          <span style={{ color: 'red', fontSize: 'large' }}>*</span>
          <label>Phno</label>
          <div className="option">
            <input name="phno" onChange={handleChange} />
            {errors.phnoError && (
              <span style={{ color: 'red' }} className="error">
                {errors.phnoError}
              </span>
            )}
          </div>
        </div>
        <div className="submitButton">
          <button type="submit">Submit Request</button>
        </div>
      </form>
    </div>
  )
}

export default ServiceForm
