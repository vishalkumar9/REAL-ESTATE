import React from "react";

import ServiceCard from "../card/ServiceCard";

import './About.css';

import im1 from "../image/im1.png";
import im2 from "../image/im2.png";
import im3 from "../image/im3.png";


const About = () => {
    return (
        <div className="aboutus">
            <div className="div1">
                <div className="text">
                    <h1>Our Story</h1>
                    <h3>"Our project was born out of a shared vision among four dedicated individuals. As a major project, we set out to create something special,
                        something that would make a difference in the world of real estate. With a passion for innovation and a commitment
                        to excellence, we brought together our diverse backgrounds and skillsets to make this vision a reality.
                        Today, we are proud to offer a unique and valuable resource to our clients, one that is the result of the hard work and dedication of our team."</h3>
                </div>
                {/*<div className="div1_image">*/}
                {/*    <img src={website} alt=""/>*/}
                {/*</div>*/}
            </div>
            <div className="services">
                <div className="heading" >
                    <h1>Services We Provide</h1>
                </div>
                <div className="display_services">
                    <ServiceCard image = {im1} heading = "Rent" content="Find your ideal rental property with our extensive selection of homes, apartment and many more."/>
                    <ServiceCard image = {im2} heading = "Sell" content="Find your dream home at a dream price with our exclusive selection of sale listings. Our team is dedicated to helping you find the best deal possible."/>
                    <ServiceCard image = {im3} heading = "Listing" content="Get the exposure you need to sell your property with our free listing service. Our platform makes it easy to list your property and get it in front of qualified buyers"/>
                </div>
            </div>
            {/*<div className="intro">*/}
            {/*    <div className="heading" >*/}
            {/*        <h1>Meet Our Devlopers</h1>*/}
            {/*    </div>*/}
            {/*    /!*<div className="display_dev">*!/*/}
            {/*    /!*    <img className="dev" src={vishal} alt=""/>*!/*/}
            {/*    /!*    <h3>Full Stack Devloper</h3>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
        </div>
    );
}

export default About;