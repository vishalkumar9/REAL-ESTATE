import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
export const useForm = () => {
  const AuthC = useContext(AuthContext)

  const [error, setError] = useState('please fill all the details marks with *')
  const [allImage, setAllImages] = useState([])

  const [propertyData, setPropertyData] = useState({
    purposeType: '', // rent or sell
    type: '',  // flat, showroom, apartment etc
    price: '',
    description:'',
    city: '',
    location: '',
    pinCode: '',
    streetNo: '',
  })

  const uploadProperty = async (e) => {
    e.preventDefault()

    try {

      for(let key in propertyData)
        if (propertyData.hasOwnProperty(key) && (propertyData[key].trim() === '' || propertyData[key] === undefined)) {
          setError(true);
          throw new Error("Please fill up the complete form");
        }

      const formData = new FormData()
      formData.append('purposeType', propertyData.purposeType);
      formData.append('type', propertyData.type);
      formData.append('price', propertyData.price);
      formData.append('description', propertyData.description);
      formData.append('city', propertyData.city);
      formData.append('location', propertyData.location);
      formData.append('pinCode', propertyData.pinCode);
      formData.append('streetNo', propertyData.streetNo);

      for (let i = 0; i < allImage.length; i++) {
        formData.append('image', allImage[i])
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_PROPERTY_URL}/uploadProperty`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AuthC.token}`,
          },
          body: formData,
        },
      )
      if (response.ok) {
        toast.success('Property Uploaded', { autoClose: 2000 })
      } else {
        toast.error('Please complete all required fields', { autoClose: 2000 })
      }
    } catch (err) {
      toast.error(err.message, { autoClose: 2000 })
    }
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    const files = e.target.files
    setAllImages(files)
  }

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    setPropertyData((propertyData) => ({
      ...propertyData,
      [e.target.name]: e.target.value,
    }))
  }

  return {
    propertyData,
    error,
    handleChange,
    handleFileChange,
    uploadProperty,
  }
}
