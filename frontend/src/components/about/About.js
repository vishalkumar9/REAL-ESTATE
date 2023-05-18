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
            <div className="heading">
                <h1>About Us</h1>
            </div>
            <div className="main_aboutus">
                <div className="heading1"><h2>Who We Are</h2></div>
                <p>
                    At Our website, we are passionate about revolutionizing the way people experience real estate. Our team of dedicated professionals is committed to providing exceptional services and delivering unparalleled value to our clients. With a deep understanding of the industry and a forward-thinking approach, we aim to create a seamless and rewarding real estate journey for all.
                </p>
                <div className="Founders">
                    <h2>Meet Our Devloper</h2>
                    <div className="container">
                        <DevloperCard name="Vishal Kumar Singh" description="Our Lead Developer of this real estate website, responsible for bringing the vision to life through code. Together with his team, they have created a seamless platform that revolutionizes the way people engage with real estate online."/>
                        <DevloperCard name ="Abhishek Negi" description="Dedicated Developer and Researcher on this real estate website, working alongside the team to bring innovation and functionality to life. By leveraging his coding expertise and conducting thorough research, he has contributed to creating a dynamic platform that empowers users with comprehensive property information."/>
                        <DevloperCard name = "Ayush Barakoti" description="Dedicated devloper on this real estate website, working alongside the team to bring innovation and functionality to life.Together, they have crafted a user-centric solution that revolutionizes the way individuals interact with the real estate market."/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;