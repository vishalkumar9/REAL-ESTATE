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
        <button disabled={true}>{props.details.price}💸  </button>
    </div>
  )
}

export default PropertyCard
