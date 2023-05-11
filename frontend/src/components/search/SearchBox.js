import React, {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../context/AuthContext";
import ShowOption from "./ShowOption";

import "./SearchBox.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {toast, ToastContainer} from "react-toastify";


const SearchBox = () => {

    const AuthC = useContext(AuthContext);

    const typeOptions = ["Rent","Sell"];
    const propertyOptions = ["Flat","Apartment","Pg"];
    const priceRangeOptions = ["5000","10000","15000","25000","50000","100000"];

    const [locationOptions,setLocationOption] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const [type,setType] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [propertyType,setPropertyType] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const history = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if(city || location || type || propertyType || maxPrice){
                const formData = new FormData();
                formData.append("city",city);
                formData.append("location",location);
                formData.append("purposeType",type);
                formData.append("propertyType",propertyType);
                formData.append("maxPrice",maxPrice);

                const response = await fetch(`${process.env.REACT_APP_BACKEND_PROPERTY_URL}/searchProperty`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${AuthC.token}`,
                    },
                    body:formData,
                })
                const responseData = await response.json();

                if(responseData.properties.length){
                    localStorage.setItem("searchProperty", JSON.stringify({
                        properties:responseData.properties,
                    }));
                    history("/property")
                }
            }
            else{
                throw new Error("Invalid search");
            }


        }catch (err){
            toast.error(err.message,{autoClose:1000});
        }
    }

    useEffect(()=>{
        const fetchAvailableLocations = async () =>{
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_PROPERTY_URL}/getAvailableLocations`);
                const responseData = await response.json();

                const cityArr = [];

                responseData.locations.map((obj)=>{
                    cityArr.push({city:obj.city,arrLoca:obj.locations});
                })

                setCityOptions(cityArr);

            }catch (err){}
        }

        fetchAvailableLocations();
    },[])

    const handleError = (e) => {
        e.preventDefault();
        toast.error("Please Login/Register to search",{autoClose:2000});
    }

    const onChange = (option) => {
        setCity(option.city);
        setLocationOption(option.arrLoca);
    }


    return(
    <div className="search_box">
        <ToastContainer className="popup_message"/>
        <div className="search_box_text">
            <h1>Search Your Next Home</h1>
            <p>Find new and featured located in your local city</p>
        </div>
        <div className="input_main_div">
            <ShowOption options={typeOptions} onChange={(option) => setType(option)} text="For Rent/Sell" flag={false}/>
            <ShowOption options={cityOptions} onChange={onChange} text="Select Your city" flag={true}/>
            <ShowOption options={locationOptions} onChange={(option) => setLocation(option)}  text="Select location" flag={false}/>
            <ShowOption options={propertyOptions} onChange={(option) => setPropertyType(option)}  text="select property type" flag={false}/>
            <ShowOption options={priceRangeOptions} onChange={(option) => setMaxPrice(option)}  text="max Price" flag={false}/>
            {<button className = "active" onClick={AuthC.token ?  handleSubmit : handleError}>{<FontAwesomeIcon icon={faSearch}/>}</button>}
        </div>
    </div>
    );
}
export default SearchBox;