import React, { useState } from 'react';
import "./propertyDisplayCard.css";
import SimpleImageSlider from "react-simple-image-slider";
const PropertyDisplayCard = ({ headerText, images, descriptionText }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const imageCount = images.length-1;
    const inc = () => {
        if(currentImage < imageCount)setCurrentImage(currentImage+1);
        else setCurrentImage(0);
    }
    const dec = () => {
        if(currentImage > 0)setCurrentImage(currentImage-1);
        else setCurrentImage(imageCount);
    }
    return (
        <div className="modal">
            <div className="modal-header">
                {headerText}
            </div>
            <div className="modal-image-slider">
                <SimpleImageSlider
                    width="80%"
                    height="50%"
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    slideDuration="2"
                />
            </div>
            <div className="modal-body">
                {descriptionText}
            </div>
        </div>
    );
};

export default PropertyDisplayCard;
