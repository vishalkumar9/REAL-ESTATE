import React from 'react'
import './PropertyCard.css'
const PropertyCard = (props) => {
  const handleModal = (e) => {
    e.preventDefault();
    props.handleModal(props.details)
  }

  return (
    <div className="full_card" onClick={handleModal}>
        <div className="image_container">
           <img src = {props.details.images[0]} alt=""/>
        </div>
        <div className="info_container">
            <p>{props.details.houseNo}, {props.details.location}, {props.details.city}, {props.details.pinCode}</p>
        </div>
        <button disabled={true}>{props.details.type}</button>
    </div>
  )
}

export default PropertyCard
