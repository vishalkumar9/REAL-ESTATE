import React, { useState, useEffect } from 'react';
import {BING_MAP_API} from "../../config";

import "./Map.css";


const Map = ({details}) => {
    const [imageUrl, setImageUrl] = useState('');
    console.log(imageUrl);
    useEffect(() => {
        const getImageUrl = async () => {
            const response = await fetch(
                `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${details.location}?&mapSize=5000,1500&key=${BING_MAP_API}`
            );
            console.log(response);
            setImageUrl(response.url);
        };

        getImageUrl();
    }, [details]);

    return (
        <div className="map-container">
            {imageUrl ? <img src={imageUrl} alt="Map" /> : <p>Loading...</p>}
        </div>
    );
};

export default Map;


