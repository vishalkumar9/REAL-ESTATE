import React from 'react'
import './DevloperCard.css'
import im1 from '../image/houseImg2.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
const DevloperCard = (props) => {
  return (
    <div className="profile-container">
      <img src={im1} alt="Profile Image" className="profile-image" />
      <h2 className="profile-name">{props.name}</h2>
      <h3 className="profile-designation">{props.designation}</h3>
      <div className="profile-about">
        <p>{props.description}</p>
      </div>
    </div>
  )
}
export default DevloperCard
