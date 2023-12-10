import React, { useState } from 'react'
import './Service.css'
import ServiceCard from '../card/ServiceCard'
import plumber from '../image/plumber.avif'
import painter from '../image/Painter.avif'
import electrician from '../image/electrician.avif'
import legal from '../image/legal document.avif'
import construction from '../image/construction.avif'
import ServiceForm from '../form/ServiceForm'
const Service = () => {
  const [requestedServiceType, setRequestedServiceType] = useState('')
  const handleForm = (e) => {
    e.preventDefault(e)
    setRequestedServiceType(e.currentTarget.id)
  }

  return (
    <div className="service_container">
      <div className="services_display">
        <div onClick={handleForm} id="Plumber">
          <ServiceCard imageUrl={plumber} word={'Plumber'} sizeD={true} />
        </div>
        <div onClick={handleForm} id="Painting">
          <ServiceCard imageUrl={painter} word={'Painter'} sizeD={true} />
        </div>
        <div onClick={handleForm} id="Construction">
          <ServiceCard
            imageUrl={construction}
            word={'Construction'}
            sizeD={true}
          />
        </div>
        <div onClick={handleForm} id="Electrician">
          <ServiceCard
            imageUrl={electrician}
            word={'Electrician'}
            sizeD={true}
          />
        </div>
        <div onClick={handleForm} id="Legal">
          <ServiceCard imageUrl={legal} word={'Legal Service'} sizeD={true} />
        </div>
      </div>
      {requestedServiceType !== '' && (
        <ServiceForm Service={requestedServiceType} />
      )}
    </div>
  )
}

export default Service
