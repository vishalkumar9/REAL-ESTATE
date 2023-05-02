import React, {useContext, useEffect} from "react";

import {AuthContext} from "../context/AuthContext";
import UploadProperty from "../form/UploadProperty";

import "./UserProfile.css";

import user_profile_image from "../image/vishal.jpg";
import houseImg4 from "../image/homeIMage.jpg";
import houseImg1 from "../image/houseImg1.jpg";
import houseImg2 from "../image/houseImg2.webp";
import houseImg3 from "../image/houseImg3.jpg";

import {motion, useTransform, useViewportScroll} from "framer-motion"
import {Avatar} from "@mui/material";
import {ToastContainer} from "react-toastify";
import OwnerPropertyCard from "../card/OwnerPropertyCard";
import {useParams} from "react-router-dom";
import {BACKEND_PROPERTY_URL} from "../../config";

const UserProfile = () =>{

    const AuthC = useContext(AuthContext);
    const {userId} = useParams();

    useEffect(() => {
        const func = async () => {
            try{
                if(AuthC.token){
                    const response = await fetch(`${BACKEND_PROPERTY_URL}/getPropertyByUserId/?userId=${userId}`,{
                        headers:{
                            "Authorization": `Bearer ${AuthC.token}`,
                        }
                    });
                    const responseData = await response.json();
                    console.log(responseData);
                }
            }catch (err){
                console.log(err);
            }
        }
        func();
    },[AuthC.token,userId]);


    const { scrollYProgress } = useViewportScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [0.6, 0.9]);


    return(
        <div className="user_main_div">
            <ToastContainer className="popup_message"/>
            <div className="user_profile_back"></div>
            <div className="user_profile">
                <Avatar src={user_profile_image} id="user_profile_image"/>
                <div className="user_details">
                    <span style={{color:"black"}}><h1>{AuthC.userName}</h1></span>
                    <span><h3>Email - {AuthC.userEmail}</h3></span>
                    {AuthC.userId===userId && <button>Edit Profile</button>}
                </div>
            </div>
            {AuthC.userId===userId && <motion.div
                style={{ scale }}
            >
                <motion.div
                    style={{
                        scaleY: scrollYProgress
                    }}
                />
                <h1 className="headingText">UPLOAD PROPERTY</h1>
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
            </motion.div>}
            <div className="display_owner_property">
                <h1  className="headingText">Listed Property</h1>
            </div>
            <OwnerPropertyCard/>
        </div>
    )
}

export default UserProfile;