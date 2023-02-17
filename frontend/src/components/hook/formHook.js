import {React, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
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
        monthlyRent:"",
        builtUpArea:"",
        propertyPrice:"",
        length:"",
        width:"",
        furnishType:"",
        pgFor:"",
        suitedFor:"",
        state:"",
        district:"",
        landmark:"",
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
            ...propertyData,monthlyRent:"",bhk:"",pgFor:"",suitedFor:"",propertyPrice:"",type: "",countOfBathroom:"",countOfBalcony:"",countOfParking:""
        }));
    },[propertyData.purposeType])

    useEffect(() => {
        setPropertyData(propertyData => ({
            ...propertyData,bhk:"",countOfBathroom:"",countOfBalcony:"",countOfParking:"",furnishType: "", constructionStatus:""
        }));
    },[propertyData.type])

    useEffect(()=>{
        if(propertyData.propertyType!==""){
            if(propertyData.purposeType!==""){
                if(propertyData.type!==""){
                    if(propertyData.houseNo!==""&&propertyData.pinCode!==""&&propertyData.district!==""&&propertyData.state!==""&&propertyData.landmark!==""){
                        if(propertyData.type==="plot" || propertyData.type==="Agricultural Land"){
                            if(propertyData.purposeType==="Sell" && propertyData.propertyPrice!==""){
                                setError(null);
                            }
                            if(propertyData.purposeType!=="Sell" && propertyData.monthlyRent!==""){
                                setError(null);
                            }
                        }
                        else if(propertyData.propertyType==="Commercial"){
                            if(propertyData.purposeType==="Sell" && propertyData.propertyPrice!==""){
                                setError(null);
                            }
                            if(propertyData.purposeType!=="Sell" && propertyData.monthlyRent!==""){
                                setError(null);
                            }
                        }
                        else {
                            if(propertyData.bhk!=="" && propertyData.countOfBathroom!==""
                                &&propertyData.constructionStatus!==""&&propertyData.furnishType!=="" &&
                                propertyData.builtUpArea!==""){
                                if(propertyData.purposeType==="Sell" && propertyData.propertyPrice!==""){
                                    setError(null);
                                }
                                if(propertyData.purposeType!=="Sell" && propertyData.monthlyRent!==""){
                                    setError(null);
                                }
                            }
                        }
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
            formData.append("monthlyRent",propertyData.monthlyRent);
            formData.append("builtUpArea",propertyData.builtUpArea);
            formData.append("propertyPrice",propertyData.propertyPrice);
            formData.append("length",propertyData.length);
            formData.append("width",propertyData.width);
            formData.append("furnishType",propertyData.furnishType);
            formData.append("pgFor",propertyData.pgFor);
            formData.append("suitedFor",propertyData.suitedFor);
            formData.append("state",propertyData.state);
            formData.append("district",propertyData.district);
            formData.append("landmark",propertyData.landmark);
            formData.append("pinCode",propertyData.pinCode);
            formData.append("houseNo",propertyData.houseNo);

            for(let i = 0; i<allImage.length; i++) {
                formData.append('image', allImage[i]);
            }

            console.log(...formData.entries());

            const response = await fetch("http://localhost:5000/property/uploadProperty", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AuthC.token}`,
                },
                body:formData,
            });
            const responseData = response.json();
        }catch (err){
            console.log(err);
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