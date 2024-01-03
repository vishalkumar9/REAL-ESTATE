import React from 'react'

import { useForm } from '../hook/formHook'

import './UploadPropertyForm.css'

const UploadPropertyForm = () => {
  const {
    propertyData,
    error,
    displayImages,
    handleChange,
    handleFileChange,
    uploadProperty,
  } = useForm();

  const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(propertyData);
  }

  return (
      <form className="uploadForm_div">
        <div className="btn-group btn-group custom_div" role="group" aria-label="Large button group" onChange={handleChange}>
          <input type="radio" className="btn-check custom_input" value="Rent" name="purposeType" id="btnradio1" autoComplete="off"/>
          <label className="btn btn-outline-primary custom_label" htmlFor="btnradio1">Rent</label>
          <input type="radio" className="btn-check custom_input" value="Sell" name="purposeType" id="btnradio2" autoComplete="off"/>
          <label className="btn btn-outline-primary custom_label" htmlFor="btnradio2">Sell</label>
        </div>
        <div className="filter_btn custom_div">
          <button style={{background: "#64748b", color: "#f8fafc"}}>Flat</button>
          <button style={{background: "#64748b", color: "#f8fafc"}}>House</button>
          <button style={{background: "#64748b", color: "#f8fafc"}}>Apartment</button>
          <button style={{background: "#64748b", color: "#f8fafc"}}>Showroom</button>
          <button style={{background: "#64748b", color: "#f8fafc"}}>Office</button>
        </div>
        <div className="input-group input-group-lg mb-3 custom_div">
          <span className="input-group-text">$</span>
          <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)"/>
        </div>
        <div className="input-group input-group-lg custom_div">
            <span className="input-group-text">About Property</span>
            <textarea className="form-control" aria-label="With textarea"></textarea>
        </div>
        <div className="input-group input-group-lg custom_div d-flex flex-wrap">
              <span className="input-group-text">Address</span>
              <input type="text" aria-label="StreetNo" className="form-control w-50" placeholder="StreetNo"/>
              <input type="text" aria-label="Location" className="form-control w-25" placeholder="location"/>
              <input type="text" aria-label="City" className="form-control w-25" placeholder="City"/>
              <input type="text" aria-label="Pincode" className="form-control w-25" placeholder="Pincode"/>
        </div>
        <div className="input-group input-group-lg custom_div">
              <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
                     aria-label="Upload" multiple={true} accept="image/*" name="imageFiles" onChange={handleFileChange}/>
              <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
  )
}

export default UploadPropertyForm
