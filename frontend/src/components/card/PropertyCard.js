import React from "react";

import "./PropertyCard.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faEye, faShareNodes} from "@fortawesome/free-solid-svg-icons";

const PropertyCard = () => {
    return (
        <div className="full-card">
            <div className="card-upperhalf">
                <h1>images</h1>
            </div>
            <div className="card-middlehalf">
                    <h3>ROOM FOR BOYS</h3>
                    <h4>price</h4>
                    <p>Description....</p>
            </div>
            <div className="lower-hallf">
                <h3>About Owner</h3>
            </div>
        </div>
    );
}

export default PropertyCard;