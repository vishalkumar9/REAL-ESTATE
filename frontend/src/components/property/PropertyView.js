import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import LoadingSpinner from "../spinner/LoadingSpinner";
import "./PropertyView.css";
import Map from "../map/Map";

const PropertyView = () => {

    const {propertyId} = useParams();

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


    return(
        <div className="property_view">
            {loading ? <div className="center">
                    <LoadingSpinner />
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
                        <span style={{color:"#0f172a", fontSize:"20px"}}>🪧 {details.houseNo} {details.location}</span>
                        <span style={{color:"#0f172a", fontSize:"20px"}}>{details.city} {details.pinCode}</span>
                        <span style={{color:"#0f172a", fontSize:"15px"}}>`Explore an outstanding property opportunity in the heart of {details.city} at {details.houseNo} on {details.location}. This well-maintained property spans {details.builtUpArea} square feet, ready for occupancy, and boasts a generous 70 feet in length. With a competitive {details.purposeType} of ₹{details.price}, this space is suitable for various purposes, offering versatility for your specific needs. Whether it's for a commercial venture, office space, or a creative endeavor, the property's strategic location and modern features make it an attractive choice. Take a virtual tour through the provided images and imagine the potential that this neutral and adaptable space holds for your unique vision.`</span>
                    </div>
                    <div className="contact_details"></div>
                    </div>
                    <div className="map_view">
                        <Map details={details}/>
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