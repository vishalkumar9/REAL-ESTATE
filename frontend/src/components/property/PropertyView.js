import React, {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import LoadingSpinner from "../spinner/LoadingSpinner";
import "./PropertyView.css";
import Map from "../map/Map";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import ContactFormModal from "../modal/ContactFormModal";
import {AuthContext} from "../context/AuthContext";
import {toast, ToastContainer} from "react-toastify";

const PropertyView = () => {

    const {propertyId} = useParams();
    const AuthC = useContext(AuthContext);

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const isEmpty = (obj) => {
        let res = JSON.stringify(obj) === '{}' || obj === null || obj === undefined;
        return res;
    };

    useEffect(() => {
            const getData = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_PROPERTY_URL}/getPropertyById/?propertyId=${propertyId}`);
                    const responseData = await response.json();
                    setLoading(false);
                    setDetails(responseData.property);
                }catch (err){
                    setLoading(false);
                }
            }
            getData();
    },[propertyId])

    const timeOut = setTimeout(() => {
        setLoading(false)
    }, 5000)

    const submitContactForm = async (contactDetails) =>{
        console.log(contactDetails);
        try{
            const formData = new FormData();
            formData.append("name",contactDetails.name);
            formData.append("email",contactDetails.email);
            formData.append("phno",contactDetails.phno);
            formData.append("propertyId",propertyId);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_NOTIFICATION_URL}/handlePropertyInterestNotification`,{
                method: 'POST',
                    headers: {
                        Authorization: `Bearer ${AuthC.token}`,
                    },
                    body: formData,
                },
            )

            if (response.ok) {
                toast.success('Notification sent to owner', { autoClose: 2000 })
            } else {
                toast.error('Something went wrong', { autoClose: 2000 })
            }

        }catch(err){
            toast.error(err.message, { autoClose: 2000 })
        }
    }

    return(
        <div className="property_view">
            <ToastContainer className="popup_message" />
            <ContactFormModal handleSubmit={submitContactForm}/>
            {loading ? <div className="center">
                    <LoadingSpinner/>
                </div>
                : !isEmpty(details) ?
                <div className="maindisplay_area">
                    <div className="image_container_container">
                        <div className="image_container">
                            {details.images.map((img,i)=>(
                                <img src={img} alt={i}/>
                            ))}
                        </div>
                    </div>
                    <div className="details">
                        <div className="main_details">
                            <span style={{color:"#0f172a", fontSize:"30px"}}>{details.purposeType} {details.price} 💸</span>
                            <span style={{color:"#0f172a", fontSize:"20px"}}>🪧 {details.streetNo} {details.location}</span>
                            <span style={{color:"#0f172a", fontSize:"20px"}}>{details.city} {details.pinCode}</span>
                            <span style={{color:"#0f172a", fontSize:"15px"}}>{details.description}</span>
                        </div>
                    </div>
                    <div className="map_view">
                        <Map details={details}/>
                    </div>
                    <div className="other_details">
                        <button data-bs-toggle="modal" data-bs-target="#conatctForm">Contact Owner</button>
                    </div>
                </div>
                :
                <div className="message">
                    <h1>204</h1>
                    <h3>At present, there isn't a property available for showcasing.</h3>
                </div>

            }
        </div>
    )
}
export default PropertyView;