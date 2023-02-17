import React from "react";

import {faMagnifyingGlassLocation} from "@fortawesome/free-solid-svg-icons";
import PropertyCard from "../card/PropertyCard"
import "./Home.css"

import hotel1 from "../image/hotel1.jpg"
import hotel2 from "../image/hotel2.jpg";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {color} from "@chakra-ui/react";
import PropertyDisplayCard from "../card/propertyDisplayCard";
const Home = () =>{

    const cities = ["Mumbai", "Patna","Dehradun","Delhi","Prayagraj"];


    return (
        <div className="home">
            <div className="search-box">
                <select name = "city">
                    {
                        cities.map((item,i) =>(
                            <option key = {i} value={item}>{item}</option>
                        ))
                    }

                </select>
                <input type="text" placeholder="Search For Locality or Landmark"/>
                <button><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </div>
            <div className="home-body">
                <PropertyCard key = {1} i={hotel1}/>
                <PropertyCard key = {2}i={hotel2}/>
            </div>
            {/*<div>*/}
            {/*    <PropertyDisplayCard headerText={"Hi"} images={[hotel1,hotel2]} descriptionText={"images display"}/>*/}
            {/*</div>*/}
        </div>
    );
}
export default Home;