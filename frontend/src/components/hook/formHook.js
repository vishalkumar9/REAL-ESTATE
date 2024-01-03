import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
export const useForm = () => {
  const AuthC = useContext(AuthContext)

  const [error, setError] = useState('please fill all the details marks with *')
  const [displayImages, setDisplayImages] = useState([])
  const [allImage, setAllImages] = useState([])

  const [propertyData, setPropertyData] = useState({
    purposeType: '', // rent or sell
    type: '',  // flat, showroom, apartment etc
    price: '',
    description:'',
    district: '',
    location: '',
    pinCode: '',
    houseNo: '',
  })

  const uploadProperty = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('purposeType', propertyData.purposeType);
      formData.append('type', propertyData.type);
      formData.append('price', propertyData.price);
      formData.append('description', propertyData.description);
      formData.append('district', propertyData.district);
      formData.append('location', propertyData.location);
      formData.append('pinCode', propertyData.pinCode);
      formData.append('houseNo', propertyData.houseNo);

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
      toast.error('something went wrong', { autoClose: 2000 })
    }
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    const files = e.target.files
    let previewImages = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const previewURL = URL.createObjectURL(file)
      previewImages.push(previewURL)
    }
    setDisplayImages(previewImages)
    setAllImages(files)
  }

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target);
    setPropertyData((propertyData) => ({
      ...propertyData,
      [e.target.name]: e.target.value,
    }))
  }

  return {
    propertyData,
    error,
    displayImages,
    handleChange,
    handleFileChange,
    uploadProperty,
  }
}
