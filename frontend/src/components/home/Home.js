import React from 'react'

import SearchBox from '../search/SearchBox'

import './Home.css'

import 'react-toastify/dist/ReactToastify.css'
import { PropertyTypeCard } from '../card/PropertyTypeCard'
import h1 from '../image/1.png'
import h2 from '../image/2.png'
import h3 from '../image/3.png'
import h4 from '../image/4.png'
import h5 from '../image/5.png'
import Footer from '../footer/Footer'
const Home = () => {
  return (
    <div className="home">
      <div className="home_back">
        <SearchBox />
      </div>
      <div className="featured_property">
        <h2>Explore a Variety of Property Types</h2>
        <div className="display_propertytype_card">
          <PropertyTypeCard img={h1} title="Residential" text="120 property" />
          <PropertyTypeCard img={h2} title="Commercial" text="120 property" />
          <PropertyTypeCard
            img={h3}
            title="Office & Showroom"
            text="120 property"
          />
          <PropertyTypeCard
            img={h4}
            title="Retail Shop & Warehouse"
            text="120 property"
          />
        </div>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  )
}
export default Home
