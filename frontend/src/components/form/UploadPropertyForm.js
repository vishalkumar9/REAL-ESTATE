import React from 'react'

import { useForm } from '../hook/formHook'

import './UploadPropertyForm.css'

const UploadPropertyForm = () => {

  const arrType = ["Flat","House","Apartment","Showroom","Office"];
  const {
    propertyData,
    error,
    handleChange,
    handleFileChange,
    uploadProperty,
  } = useForm();


  return (
      <form className="uploadForm_div">
        <div className="btn-group btn-group custom_div" role="group" aria-label="Large button group" onChange={handleChange}>
          <input type="radio" className="btn-check custom_input" value="Rent" name="purposeType" id="btnradio1" autoComplete="off"/>
          <label className="btn btn-outline-primary custom_label" htmlFor="btnradio1">Rent</label>
          <input type="radio" className="btn-check custom_input" value="Sell" name="purposeType" id="btnradio2" autoComplete="off"/>
          <label className="btn btn-outline-primary custom_label" htmlFor="btnradio2">Sell</label>
        </div>
        <div className="filter_btn custom_div">
            {arrType.map((content,i) => (
                <button key={i} style={propertyData.type===content ?{background: "#0f172a", color: "#64748b"} : {background: "#64748b", color: "#f8fafc"}} value={content} name="type" onClick={handleChange}>{content}</button>
            ))}
        </div>
        <div className="input-group input-group-lg mb-3 custom_div">
          <span className="input-group-text">$</span>
          <input type="text" className="form-control" name="price" aria-label="Dollar amount (with dot and two decimal places)" onChange={handleChange}/>
        </div>
        <div className="input-group input-group-lg custom_div">
            <span className="input-group-text">About Property</span>
            <textarea className="form-control" name="description" aria-label="With textarea" onChange={handleChange}></textarea>
        </div>
        <div className="input-group input-group-lg custom_div d-flex flex-wrap">
              <span className="input-group-text">Address</span>
              <input type="text" name="streetNo" className="form-control w-50" placeholder="StreetNo" onChange={handleChange}/>
              <input type="text" name="location"  className="form-control w-25" placeholder="location" onChange={handleChange}/>
              <input type="text" name="city" className="form-control w-25" placeholder="City" onChange={handleChange}/>
              <input type="text" name="pinCode" className="form-control w-25" placeholder="Pincode" onChange={handleChange}/>
        </div>
        <div className="input-group input-group-lg custom_div">
              <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
                     aria-label="Upload" multiple={true} accept="image/*" name="imageFiles" onChange={handleFileChange}/>
              <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={uploadProperty}>Submit</button>
        </div>
      </form>
  )
}

export default UploadPropertyForm
