import React from 'react'

import './FeatureCard.css'

const FeatureCard = (props) => {
  return (
    <div className="service_card">
      <div className="show_image">
        <img src={props.image} alt="" />
      </div>
      <div className="info_text">
        <h1>{props.heading}</h1>
        <h3>{props.content}</h3>
      </div>
    </div>
  )
}

export default FeatureCard
