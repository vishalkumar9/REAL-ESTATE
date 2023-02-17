import React, {useRef, useState} from "react";
import {Avatar} from "@mui/material";
import user_profile_image from "../image/vishal.jpg";
import {motion, useTransform, useViewportScroll} from "framer-motion"

import "./UserProfile.css";
import houseImg4 from "../image/homeIMage.jpg";
import houseImg1 from "../image/houseImg1.jpg";
import houseImg2 from "../image/houseImg2.webp";
import houseImg3 from "../image/houseImg3.jpg";
import UploadProperty from "../form/UploadProperty";

const UserProfile = () =>{

    const [uploadFormStatus,setUploadFormStatus] = useState(false);
    const openUploadForm = () =>{
        setUploadFormStatus(true);
    }

    const { scrollYProgress } = useViewportScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [0.6, 0.9]);

    return(
        <div className="user_main_div">
            <div className="user_profile_back"></div>
            <div className="user_profile">
                <Avatar src={user_profile_image} id="user_profile_image"/>
                <div className="user_details">
                    <span style={{color:"black"}}><h1>Vishal kumar Singh</h1></span>
                    <span><h3>Email - vishal091200kumar@gmail.com</h3></span>
                    <h3>Phno - +91 99975 79413 </h3>
                    <button>Edit Profile</button>
                </div>
            </div>
            <motion.div
                style={{ scale }}
            >
                <motion.div
                    style={{
                        scaleY: scrollYProgress
                    }}
                />
                <h1 className="headingUploadText">UPLOAD PROPERTY</h1>
                <div className="lower_div">
                        <div className="imageShow_div">
                            <div className="stack1">
                                <img src = {houseImg1} alt = "" className="Img1"/>
                                <img src = {houseImg2} alt = "" className="Img2"/>
                            </div>
                            <div className="stack2">
                                <img src = {houseImg3} alt = "" className="Img3"/>
                                <img src = {houseImg4} alt = ""  className="Img4"/>
                            </div>
                        </div>
                    <UploadProperty/>
                </div>
            </motion.div>
        </div>
    )
}

export default UserProfile;