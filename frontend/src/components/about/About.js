import React from "react";

import FeatureCard from "../card/FeatureCard";

import './About.css';

import im1 from "../image/im1.png";
import im2 from "../image/im2.png";
import im3 from "../image/im3.png";
import DevloperCard from "../card/DevloperCard";


const About = () => {
    return (
        <div className="aboutus">
            <div className="heading1 odd">
                <h1>Who We Are?</h1>
                <p>At Real Estate, we are more than just a real estate agency – we're your trusted partner on your journey to finding or selling your dream property. Our passion for real estate, commitment to excellence, and dedication to our clients set us apart in the industry.</p>
            </div>
            <div className="heading2 even">
                <h1>Our Story</h1>
                <p>Our journey began with a vision to redefine the real estate experience, making it seamless, rewarding, and tailored to each unique situation. Over the years, we have not only realized this vision but have also built a reputation for our expertise, integrity, and outstanding service.</p>
            </div>
            <div className="heading3 odd">
                <h1>Why Choose Us</h1>
                <div className="reasons_tag">
                    <h3 style={{color:"#00008B"}}>Expertise</h3>
                    <h3 style={{color:"#00BFFF"}}>Transparency</h3>
                    <h3 style={{color:"#FFA500"}}>Exceptional Service</h3>
                    <h3 style={{color:"#008080"}}>Innovation</h3>
                </div>
            </div>
        </div>
    );
}

export default About;