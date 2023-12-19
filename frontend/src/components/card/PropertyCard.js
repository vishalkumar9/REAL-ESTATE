import React, { useEffect, useState } from 'react'

import './PropertyCard.css'
const PropertyCard = (props) => {
  const handleModal = (e) => {
    e.preventDefault()
    props.handleModal(props.details)
  }

  return (
    <div className="full_card">
        <div className="image_container">
           <img src = {props.details.images[0]} alt=""/>
        </div>
        <div className="info_container">
            <p>House No 33B, Aakirti Vihar</p>
            <p>Lane no 12, Clement Town</p>
            <p>Dehradun, 248002</p>
            <p>Rent</p>
        </div>
    </div>
  )
}

export default PropertyCard
