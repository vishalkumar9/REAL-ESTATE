import React, { useState, useEffect } from 'react';

import "./Map.css";


const Map = ({details}) => {
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        const getImageUrl = async () => {
            const response = await fetch(
                `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${details.houseNo},${details.location},${details.city},${details.pinCode}?&mapSize=5000,1500&key=${process.env.REACT_APP_BING_MAP_API}`
            );
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


