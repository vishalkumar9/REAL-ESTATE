import React from 'react'
import './PropertyTypeCard.css'
export function PropertyTypeCard({ img, title, text }) {
  return (
    <div className="propertyTypeCard shadow-sm bg-body-tertiary rounded">
      <div className="svg_area">
        <img src={img} alt="" />
      </div>
      <div className="text">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  )
}
