import React from "react";

import "./PropertyCard.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faEye, faShareNodes} from "@fortawesome/free-solid-svg-icons";
import hotelImg from "../image/hotel1.jpg"
import hotelImg1 from "../image/hotel2.jpg";
import SimpleImageSlider from "react-simple-image-slider";
import {border, transition} from "@chakra-ui/react";

const PropertyCard = (props) => {
    const image = [
        {url: hotelImg},
        {url:hotelImg1}
    ]
    return (
        <div className="full-card">
            <div className="card-upperhalf">
                <div className="image-div">
                    <SimpleImageSlider
                        width="16rem"
                        height="16rem"
                        images={image}
                        showBullets={true}
                        showNavs={true}
                        slideDuration="2"
                    />
                </div>
            </div>
            <div className="card-middlehalf">
                    <h3>Property Types</h3>
                    <h4>$ 256/yr</h4>
                    <h3>2 BHK</h3>
                    <h3>Fully Furnished</h3>
            </div>
            <div className="lower-half">
                <h3>IDEAL</h3>
            </div>
        </div>
    );
}

export default PropertyCard;