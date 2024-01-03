import React from 'react'

import './About.css'
import mission from "../image/mission.webp";
import CountUp from "react-countup";

import vishal from "../image/vishal.jpg";
const About = () => {
  return (
    <div className="aboutus">
      <div className="aboutus_back">
        <h1>"Learn More About Us"</h1>
      </div>
      <div className="mission">
        <div className="general_card">
          <h1>
            We're on a Mission to Change View of Real Estate Field
          </h1>
          <img src={mission} alt=""/>
        </div>
        <div className="general_card">
            "Transforming the landscape of real estate, one innovative perspective at a time. Our mission isn't just about properties; it's about redefining experiences, creating connections, and shaping futures. From dream homes to visionary investments, we're dedicated to changing the way you perceive real estate – with passion, expertise, and a commitment to your journey."
        </div>
      </div>
      <div className="counting_section">
          <div className="show">
              <CountUp end={2000} duration={2.5} style={{fontSize:"40px"}}/>
              <p>Property View</p>
          </div>
          <div className="show">
              <CountUp end={1800} duration={2.5} style={{fontSize:"40px"}}/>
              <p>Happy  customers</p>
          </div>
          <div className="show">
              <CountUp end={100} duration={2.5} style={{fontSize:"40px"}}/>
              <p>Property listing</p>
          </div>
      </div>
    </div>
  )
}

export default About
