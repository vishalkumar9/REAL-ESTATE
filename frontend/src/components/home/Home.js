import React from "react";

import PropertyCard from "../card/PropertyCard"
import "./Home.css"
const Home = () =>{
    return (
        <div className="home">
            <div className="home-body">
                <PropertyCard/>
                <PropertyCard/>
                <PropertyCard/>
                <PropertyCard/>
            </div>
        </div>
    );
}
export default Home;