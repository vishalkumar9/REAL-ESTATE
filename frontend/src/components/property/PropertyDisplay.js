import React, {useEffect, useState} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {motion} from "framer-motion";
import PropertyCard from '../card/PropertyCard'

import './PropertyDisplay.css'

const PropertyDisplay = () => {

    const history = useNavigate()
    const searchProperty = JSON.parse(localStorage.getItem('searchProperty'))
    const [properties, setProperties] = useState(searchProperty.properties)
    const [details, setDetails] = useState(null)

    const [selectedType, setSelectedType] = useState("All");
    const [selectedPurposeType, setPurposeType] = useState("All");
    const [click, setClick] = useState(false);

    const handelModal = (details) => {
        setDetails(details)
        history(`${details._id}`)
    }


    const handleType = (e) => {
        const type = e.target.textContent === selectedType ? "All" : e.target.textContent;
        setSelectedType(type);
    }

    const handlePurposeType = (e) => {
        let temp = e.target.textContent === "Buy" ? "Sell" : e.target.textContent;
        let pType = temp === selectedPurposeType ? "All" : temp;
        setPurposeType(pType);
    }

    useEffect(() => {
        let filteredProperty = [];
        for (let i = 0; i < searchProperty.properties.length; i++) {
            if ((searchProperty.properties[i].purposeType === selectedPurposeType || selectedPurposeType === "All") && (searchProperty.properties[i].type === selectedType || selectedType === "All")) {
                filteredProperty.push(searchProperty.properties[i]);
            }
        }

        setProperties(filteredProperty);
    }, [click]);

    const handleSubmit = (e) => {
        setClick(!click);
    }
    const variants = {
        hidden: { opacity: 0, filter: "blur(8px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
    };


    return (
        <div className="property">
            <div className="filter">
                <div className="filter_btn">
                    <button style={selectedPurposeType !== "Rent" ? {
                        background: "#003049",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handlePurposeType}><span>Rent</span>
                    </button>
                    <button style={selectedPurposeType !== "Sell" ? {
                        background: "#d62828",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handlePurposeType}><span>Buy</span></button>
                    <button style={selectedType !== "Flat" ? {
                        background: "#f77f00",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handleType}><span>Flat</span></button>
                    <button style={selectedType !== "Plot" ? {
                        background: "#1b4332",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handleType}><span>Plot</span></button>
                    <button style={selectedType !== "Office" ? {
                        background: "#a4133c",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handleType}><span>Office</span></button>
                    <button style={selectedType !== "Showroom" ? {
                        background: "#6d597a",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handleType}><span>Showroom</span></button>
                    <button style={selectedType !== "House" ? {
                        background: "#5f0f40",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handleType}><span>House</span></button>
                    <button style={selectedType !== "Apartment" ? {
                        background: "#ae2012",
                        color: "aliceblue"
                    } : {background: "#253237", color: "#5c6b73"}} onClick={handleType}><span>Apartment</span></button>
                </div>
                <div className="submit_btn">
                    <button className="btn" style={{background: "#028090", color: "aliceblue"}} onClick={handleSubmit}>
                        <span>Apply Filter</span></button>
                </div>
            </div>
            <div className="show_all_properties">
                    {properties.map((property, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            layout
                        >
                        <PropertyCard
                            key={i}
                            details={property}
                            flag="show"
                            handleModal={handelModal}
                        />
                        </motion.div>
                    ))}
            </div>
        </div>
    )
}
export default PropertyDisplay;
