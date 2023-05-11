import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

import "./PropertyDisplayCard.css";

import userImg from "../image/user.png";
import map from "../image/map.png";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Map from "../map/Map.js";

const PropertyDisplayCard = () => {

    const AuthC  = useContext(AuthContext);

    const [details,setDetails] = useState(null);
    const [mapModal,setMapModal] = useState(false);
    const {propertyId} = useParams();

    const history = useNavigate();
    console.log(details);

    useEffect( ()=>{
        const func = async() =>{
            try{
                if(AuthC.token) {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_PROPERTY_URL}/getPropertyById/?propertyId=${propertyId}`, {
                        headers: {
                            "Authorization": `Bearer ${AuthC.token}`
                        },
                    });
                    const responseData = await response.json();
                    console.log(responseData);
                    setDetails(responseData.property);
                }
            }catch (err){
                return err;
            }
        }

        func();

    },[AuthC.token,propertyId]);

    const [currentImage, setCurrentImage] = useState(0);
    let imageCount = 0;
    if(details!==null){
        imageCount = details.images.length-1;
    }

    const inc = () => {
        if(currentImage < imageCount)setCurrentImage(currentImage+1);
        else setCurrentImage(0);
    }
    const dec = () => {
        if(currentImage > 0)setCurrentImage(currentImage-1);
        else setCurrentImage(imageCount);
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(details);
        history(`/profile/user/${details.user._id}`);
    }

    const handleMap = (e) => {
        e.preventDefault();
        setMapModal(!mapModal);
    }

    if(details!==null){
        return (
            <div className="modal">
                <div className="displayImage">
                    {details.images.map((image,i)=>(
                        <img src = {image} key = {i} alt=""/>
                    ))}
                </div>
                <div className="details">
                    <div className="first_half">
                        <h2>About Property</h2>
                        <p>
                            This {details.furnishType} {details.bhk} BHK {details.type} is located in {details.location}, {details.city} and is available for {details.purposeType} The built-up area of the property is {details.builtUpArea}
                            sq ft and it has a {details.countOfBathroom} bathroom. The flat has a construction status of "{details.constructionStatus}".
                            The age of the property is {details.ageOfProperty} years. The pin code of the area is {details.pinCode}.
                            The {details.purposeType==="Sell"? "Price" : "Rent"} of the property is {details.price} . The flat has {details.images.length} images available for viewing.
                            The property is suited for {details.propertyType} purposes and is ideal for small families or individuals.
                        </p>
                    </div>
                    <div className="second_half">
                        <h2>Key Points</h2>
                        <div className="key_points">
                            <button>{<FontAwesomeIcon icon={faLocationDot}/>}  Aakirti Vihar, Dehradun, 248002</button>
                            <button>Fully Furnished</button>
                            <button>Residential</button>
                            <button>Property Age 3years</button>
                            <button>3 bathroom</button>
                            <button>Ready to move</button>
                            <button>3 BHK</button>
                            <button>4 balcony</button>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="owner_details">
                    <button onClick={handleClick}>
                        <img src = {userImg} alt={""}/>
                        <p1>Owner Profile</p1>
                    </button>
                    <button onClick={handleMap}>
                        <img src = {map} alt={""}/>
                        <p1>View In Map</p1>
                    </button>
                </div>
                <div className="divider"></div>
                {mapModal && <div className="map_display">
                    <Map details={details}/>
                </div>
                }
            </div>
        );
    }
    return (
        <div>
            <h1>Somthing Went Wrong</h1>
        </div>
    )

};

export default PropertyDisplayCard;
