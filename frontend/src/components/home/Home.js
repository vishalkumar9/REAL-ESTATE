import React from "react";

import SearchBox from "../search/SearchBox";

import "./Home.css"

import 'react-toastify/dist/ReactToastify.css';

const Home = () =>{


    return (
        <div className="home">
            <div className="home_back">
                    <SearchBox/>
            </div>
        </div>
    );
}
export default Home;