import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer_div">
      <div className="footer_main_content">
        <div className="feedback">
          <h3>Leave Feedback</h3>
          <form className="user_feedback">
            <textarea placeholder="write your feedback here"></textarea>
            <button className="active">Submit</button>
          </form>
        </div>
        <ul className="link_list">
          <li>
            <a href="/aboutus">About</a>
          </li>
          <li>
            <a>Privacy Policy</a>
          </li>
          <li>
            <a>Licensing</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>
      <h2></h2>
      <div className="footer_div_foot_content">
        ©2023 RealEstate . All rights reserved.
      </div>
    </footer>
  )
}
export default Footer
