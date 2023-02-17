import React from "react";
import './About.css';
import houseImage from "../image/undraw_house_searching_re_stk8.svg";
import {Avatar} from "@mui/material";

import vishal from "../image/vishal.jpg";
import garvit from "../image/garvit.jpg";

const About = () => {
    return (
        <div className="aboutus">
            <div className="aboutus_head">
                <div className="aboutus_head_heading">
                    <h1> Looking for House</h1>
                    <h4> Your search ends here</h4>
                </div>
                <div className="aboutus_head_img">
                    <img src = {houseImage}/>
                </div>
            </div>

            <div className="features_gallery">
                <div className="features_gallery_heading">
                    <h1>What we are providing</h1>
                </div>
            </div>

            <div className="aboutFounder">
                <h1>Developers</h1>
                <div className="founder_list">
                    <div className="founderDetails">
                        <Avatar src={vishal} id="fimg"/>
                        <h4>Vishal Singh</h4>
                    </div>
                    <div className="founderDetails">
                        <Avatar src={garvit} id="fimg"/>
                        <h4>Garvit Chawla</h4>
                    </div>
                    <div className="founderDetails">
                        <Avatar src={vishal} id="fimg"/>
                        <h4>Abhishek Negi</h4>
                    </div>
                    <div className="founderDetails">
                        <Avatar src={vishal} id="fimg"/>
                        <h4>Ayush Barakoti</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;