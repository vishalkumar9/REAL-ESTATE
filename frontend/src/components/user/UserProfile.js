import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {motion, useTransform, useViewportScroll} from "framer-motion"
import {Avatar} from "@mui/material";
import {toast,ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";

import OwnerPropertyCard from "../card/OwnerPropertyCard";
import {AuthContext} from "../context/AuthContext";
import UploadProperty from "../form/UploadProperty";


import "./UserProfile.css";

const UserProfile = () =>{

    const AuthC = useContext(AuthContext);
    const {userId} = useParams();
    const history = useNavigate();

    const [properties,setProperties] = useState([]);
    const [ownerDetails, setOwnerDetails] = useState({});

    useEffect(() => {
        const func = async () => {
            try{
                if(AuthC.token){
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_PROPERTY_URL}/getPropertyByUserId/?userId=${userId}`,{
                        headers:{
                            "Authorization": `Bearer ${AuthC.token}`,
                        }
                    });
                    const responseData = await response.json();
                    const ownerInfo = {
                        name:responseData.name,
                        email:responseData.email,
                        profileImage:responseData.profileImage,
                    }
                    setProperties(responseData.properties);
                    setOwnerDetails(ownerInfo);
                }
            }catch (err){
                toast.error(err.message,{autoClose:1000});
            }
        }
        func();
    },[AuthC.token,userId]);

    const handleDisplayOwnerProperty = (e) => {
        e.preventDefault();
        if(properties.length){
            localStorage.setItem("searchProperty", JSON.stringify({
                properties:properties,
            }));
            history("/property")
        }
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const { scrollYProgress } = useViewportScroll()
    const scale = useTransform(scrollYProgress, [0, 1], windowWidth < 500 ? [0.5,0.5] :[0.7,0.9]);

    return(
        <div className="user_main_div">
            <ToastContainer className="popup_message"/>
            {AuthC.userId===userId && <div>
                <h1 className="headingText">UPLOAD PROPERTY</h1>
                <div className="lower_div">
                    <UploadProperty/>
                </div>
            </div>
            }
            <div className="display_owner_property_conatainer">
                <div className="display_owner_property">
                    {properties.length>0 && <h1 className="headingText">Listed Property</h1>}
                    <div className="owner_property">
                        {properties.map((property,i)=>(
                            <OwnerPropertyCard key={i} details = {property}/>
                            ))
                        }
                    </div>
                    {properties.length &&
                        <button onClick={handleDisplayOwnerProperty}>View All ></button>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile;