import React from 'react'
import './ServiceCard.css'
const ServiceCard = ({ imageUrl, word, sizeD }) => {
  return (
    <div className={sizeD ? 'card' : 'simp'}>
      <img className="card-image" src={imageUrl} alt="Card Background" />
      {sizeD && (
        <div className="card-overlay">
          <h1 className="card-text">{word}</h1>
        </div>
      )}
    </div>
  )
}

export default ServiceCard
