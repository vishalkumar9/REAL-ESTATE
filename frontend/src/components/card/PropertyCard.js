import React, {useEffect, useState} from "react";

import "./PropertyCard.css";

import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SimpleImageSlider from "react-simple-image-slider";

const PropertyCard = (props) => {

    const handleModal = (e) => {
        e.preventDefault();
        props.handleModal(props.details);
    }

    return (
        <div className="full-card">
            <div className="card-upperhalf">
                <div className="image-div">
                    <SimpleImageSlider
                        width="20rem"
                        height="25vh"
                        images={props.details.images}
                        showBullets={true}
                        showNavs={true}
                        slideDuration="2"
                    />
                </div>
            </div>
            <div className="card_middlehalf">
                    <div className="middelhalf_Text">
                        <h2>{props.details.purposeType}</h2>
                        <h3>{props.details.type}</h3>
                    </div>
                    <h4>{<FontAwesomeIcon icon={faLocationDot}/>} {props.details.houseNo}  {props.details.location}, {props.details.city}, {props.details.pinCode}</h4>
            </div>
            <div className="divider"></div>
            <div className="lower_half">
                <h4>Rs {props.details.price}/ {props.details.purposeType==="Rent" ?"Mnth" : "Yr"}</h4>
                {props.flag==="show" && <button onClick={handleModal}>View</button>}
            </div>
        </div>
    );
}

export default PropertyCard;