import React from "react";
import "./OwnerPropertyCard.css";
import SimpleImageSlider from "react-simple-image-slider";
const OwnerPropertyCard = ({details}) => {

    return(
        <div className="full-card">
            <div className="card-upperhalf">
                <div className="image-div">
                    <SimpleImageSlider
                        width="20rem"
                        height="25vh"
                        images={details.images}
                        showBullets={true}
                        showNavs={true}
                        slideDuration="2"
                    />
                </div>
            </div>
            <div className="lower_half">
                <h4>{details.purposeType}</h4>
            </div>
        </div>
    )
};

export default OwnerPropertyCard;