import React, {useContext, useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";

import PropertyCard from "../card/PropertyCard";

import "./PropertyDisplay.css";
import PropertyDisplayCard from "../card/PropertyDisplayCard";

const PropertyDisplay = () => {
    const history = useNavigate();
    const searchProperty = JSON.parse(localStorage.getItem("searchProperty"));

    const properties = searchProperty.properties;
    const [details,setDetails] = useState(null);
    const handelModal = (details) => {
        setDetails(details);
        history(`${details._id}`);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div className="property">
            <div className="show_all_properties_container">
                <div className="show_all_properties">
                    {properties.map((property,i) => (
                        <PropertyCard key={i} details={property} flag="show" handleModal={handelModal}/>
                    ))}
                </div>
            </div>
            {details !== null &&
                <div className="show_property">
                    <Routes>
                        <Route path="/:propertyId" element={<PropertyDisplayCard details={details}/>}/>
                    </Routes>
                </div>
            }
        </div>
    );
}

export default PropertyDisplay;