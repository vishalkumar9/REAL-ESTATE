import React, {useEffect, useRef, useState} from 'react'

import SearchBox from '../search/SearchBox'

import './Home.css'

import 'react-toastify/dist/ReactToastify.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faForward} from "@fortawesome/free-solid-svg-icons";

import newdelhi from "../image/newdelhi.webp";
import mumbai from "../image/mumbai.jpg";
import madhya from "../image/madhya.jpg";
import jaipur from "../image/jaipur.jpg";
import nalanda from "../image/nalanda.jpg";
import karnatka from "../image/karnatka.jpg";
import kerala from "../image/kerala.jpeg";
import haridwar from "../image/haridwar.jpeg";
import quotes_img from "../image/quotes.jpg";
import rev1 from "../image/rev1.jpeg";
import rev2 from "../image/rev2.jpeg";
import rev3 from "../image/rev4.jpeg";

import ReviewCard from "../card/ReviewCard";

const Home = () => {
    const propertyByCityRef = useRef(null);
    const scroll = (scrollOffset) => {
        const propertyByCity = propertyByCityRef.current;
        if (propertyByCity) {
            propertyByCity.scrollLeft += scrollOffset;
        }
    };

  return (
    <div className="home">
      <div className="home_back">
          <h1>Easy Way to Find a Perfect Property</h1>
        <SearchBox/>
      </div>
      <div className="header">
          <h1>"Discover Top Real Estate Opportunities in Iconic Cities"</h1>
      </div>
      <div className="property_scroller">
          <button onClick={() => scroll(-150)}><FontAwesomeIcon icon={faBackward} style={{fontSize:"40px"}} /></button>
            <div className="propertyByCity" ref={propertyByCityRef}>
                <div className="img_container">
                    <img src={madhya} alt=""/>
                    <label>ujjain</label>
                </div>
                <div className="img_container notfirst">
                    <img src={nalanda} alt=""/>
                    <label>Patna</label>
                </div>
                <div className="img_container notfirst">
                    <img src={jaipur} alt=""/>
                    <label>Jaipur</label>
                </div>
                <div className="img_container notfirst">
                    <img src={mumbai} alt=""/>
                    <label>Mumbai</label>
                </div>
                <div className="img_container notfirst">
                    <img src={newdelhi} alt=""/>
                    <label>New delhi</label>
                </div>
                <div className="img_container notfirst">
                    <img src={karnatka} alt=""/>
                    <label>Bangalore</label>
                </div>
                <div className="img_container notfirst">
                    <img src={kerala} alt=""/>
                    <label>Chennai</label>
                </div>
                <div className="img_container notfirst">
                    <img src={haridwar} alt=""/>
                    <label>haridwar</label>
                </div>
            </div>
          <button onClick={() => scroll(150)}><FontAwesomeIcon icon={faForward} style={{fontSize:"40px"}} /></button>
      </div>
      <div className="header">
            <h1>"Quotable Moments in Property"</h1>
      </div>
      <div className="quotes">
          <img src={quotes_img} alt=""/>
          <div className="quotes_container">
              <h3>
                  "The best investment on Earth is earth." - Louis Glickman
              </h3>
              <br></br>
              <h3>
                  "Owning a home is a keystone of wealth - both financial affluence and emotional security." - Suze Orman
              </h3>
          </div>
      </div>
      <div className="testimonials">
        <div className="testimonials_header">
                <h1>Customer Stories</h1>
                <h4>"Discover what our clients have to say about their experiences with us"</h4>
        </div>
        <div className="review_container">
            <ReviewCard img={rev1} content={"Working with Real Estate was a game-changer for us. Their team guided us through every step of the home buying process. Their dedication and expertise made finding our dream home a reality. Highly recommend!"}/>
            <ReviewCard img={rev2} content={"Working with Real Estate was a game-changer for us. Their team guided us through every step of the home buying process. Their dedication and expertise made finding our dream home a reality. Highly recommend!"}/>
            <ReviewCard img={rev3   } content={"Working with Real Estate was a game-changer for us. Their team guided us through every step of the home buying process. Their dedication and expertise made finding our dream home a reality. Highly recommend!"}/>
        </div>
      </div>
    </div>
  )
}
export default Home
