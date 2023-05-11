import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {toast} from "react-toastify";
export const useForm = () => {

    const AuthC = useContext(AuthContext);

    const [error,setError] = useState("please fill all the details marks with *");

    const [propertyData, setPropertyData] = useState({
        propertyType:"",
        purposeType:"",
        type:"",
        constructionStatus:"",
        ageOfProperty:"",
        bhk:"",
        countOfBathroom:"",
        countOfBalcony:"",
        countOfParking:"",
        builtUpArea:"",
        price:"",
        length:"",
        width:"",
        furnishType:"",
        pgFor:"",
        suitedFor:"",
        district:"",
        location:"",
        pinCode:"",
        houseNo:"",
    })

    const [displayImages,setDisplayImages] = useState([]);
    const [allImage,setAllImages] = useState([]);

    useEffect(() => {
        setPropertyData(propertyData => ({
            ...propertyData, purposeType:""
        }));
    },[propertyData.propertyType]);


    useEffect(() => {
        setPropertyData(propertyData => ({
            ...propertyData,bhk:"",pgFor:"",suitedFor:"",type: "",countOfBathroom:"",countOfBalcony:"",countOfParking:""
        }));
    },[propertyData.purposeType])

    useEffect(() => {
        setPropertyData(propertyData => ({
            ...propertyData,bhk:"",countOfBathroom:"",countOfBalcony:"",countOfParking:"",furnishType: "", constructionStatus:""
        }));
    },[propertyData.type])

    useEffect(()=>{
        if (
            propertyData.propertyType !== "" &&
            propertyData.purposeType !== "" &&
            propertyData.type !== "" &&
            propertyData.houseNo !== "" &&
            propertyData.pinCode !== "" &&
            propertyData.district !== "" &&
            propertyData.location !== ""
        ) {
            if (propertyData.type === "plot" || propertyData.type === "Agricultural Land") {
                if (propertyData.purposeType === "Sell" && propertyData.Price !== "") {
                    setError(null);
                } else if (propertyData.purposeType !== "Sell" && propertyData.price !== "") {
                    setError(null);
                }
            } else if (propertyData.propertyType === "Commercial") {
                if (propertyData.purposeType === "Sell" && propertyData.price !== "") {
                    setError(null);
                } else if (propertyData.purposeType !== "Sell" && propertyData.price !== "") {
                    setError(null);
                }
            } else {
                if (
                    propertyData.bhk !== "" &&
                    propertyData.countOfBathroom !== "" &&
                    propertyData.constructionStatus !== "" &&
                    propertyData.furnishType !== "" &&
                    propertyData.builtUpArea !== ""
                ) {
                    if (propertyData.purposeType === "Sell" && propertyData.price !== "") {
                        setError(null);
                    } else if (propertyData.purposeType !== "Sell" && propertyData.price !== "") {
                        setError(null);
                    }
                }
            }
        }
    },[propertyData]);



    const uploadProperty = async(e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("propertyType",propertyData.propertyType);
            formData.append("purposeType",propertyData.purposeType);
            formData.append("type",propertyData.type);
            formData.append("constructionStatus",propertyData.constructionStatus);
            formData.append("ageOfProperty",propertyData.ageOfProperty);
            formData.append("bhk",propertyData.bhk);
            formData.append("countOfBathroom",propertyData.countOfBathroom);
            formData.append("builtUpArea",propertyData.builtUpArea);
            formData.append("price",propertyData.price);
            formData.append("length",propertyData.length);
            formData.append("width",propertyData.width);
            formData.append("furnishType",propertyData.furnishType);
            formData.append("pgFor",propertyData.pgFor);
            formData.append("suitedFor",propertyData.suitedFor);
            formData.append("city",propertyData.district);
            formData.append("location",propertyData.location);
            formData.append("pinCode",propertyData.pinCode);
            formData.append("houseNo",propertyData.houseNo);


            for(let i = 0; i<allImage.length; i++) {
                formData.append('image', allImage[i]);
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_PROPERTY_URL}/uploadProperty`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AuthC.token}`,
                },
                body:formData,
            });
            if(response.ok){
                toast.success("Property Uploaded",{autoClose:2000});
            }
            else{
                toast.error("Please complete all required fields",{autoClose:2000});
            }
        }catch (err){
            toast.error("something went wrong",{autoClose:2000});
        }
    }


    const handleFileChange = (e) => {
        e.preventDefault();
        const files = e.target.files;
        let previewImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const previewURL = URL.createObjectURL(file);
            previewImages.push(previewURL);
        }
        setDisplayImages(previewImages);
        setAllImages(files);
    }


    const handleChange = (e) => {
        e.preventDefault();
        setPropertyData(propertyData => ({
            ...propertyData, [e.target.name]:e.target.value
        }));
    }

    return {propertyData, error, displayImages, handleChange, handleFileChange, uploadProperty};
}