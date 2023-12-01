import React,{useContext, useEffect, useState,Suspense} from 'react';
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext";
import OwnerPropertyCard from "../card/OwnerPropertyCard";
import {useNavigate, useParams} from "react-router-dom";
import "./UserProperty.css";
import LoadingSpinner from "../spinner/LoadingSpinner";
const UserProperty = () => {

    const AuthC = useContext(AuthContext);
    const {userId} = useParams();
    const history = useNavigate();

    const [properties,setProperties] = useState([]);
    const [ownerDetails, setOwnerDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const func = async () => {
            try{
                if(AuthC.token){
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_PROPERTY_URL}/getPropertyByUserId/?userId=${userId}`,{
                        headers:{
                            "Authorization": `Bearer ${AuthC.token}`,
                        }
                    });
                    const responseData = await response.json();
                    const ownerInfo = {
                        name:responseData.name,
                        email:responseData.email,
                        profileImage:responseData.profileImage,
                    }
                    setProperties(responseData.properties);
                    setOwnerDetails(ownerInfo);
                    setLoading(false);
                }
            }catch (err){
                toast.error(err.message,{autoClose:1000});
                setLoading(false);
            }
        }
        func();
    },[AuthC.token,userId]);

    const handleDisplayOwnerProperty = (e) => {
        e.preventDefault();
        if(properties.length){
            localStorage.setItem("searchProperty", JSON.stringify({
                properties:properties,
            }));
            history("/property")
        }
    }

    const timeOut = setTimeout(()=>{
        setLoading(false);
    },5000);


    return (
        <div className="user-property">
            {loading ? <div className="center"><LoadingSpinner/></div> :
                    properties.length ?
                        <div className="display_owner_property_container">
                            <div className="display_owner_property">
                                {properties.length > 0 && <h1 className="headingText">Listed Property</h1>}
                                <div className="owner_property">
                                    {properties.map((property, i) => (
                                        <OwnerPropertyCard key={i} details={property}/>
                                    ))
                                    }
                                </div>
                                {properties.length &&
                                    <button onClick={handleDisplayOwnerProperty}>View All ></button>
                                }
                            </div>
                        </div>
                        :
                        <div className="message">
                            <h1>204</h1>
                            <h3>At present, there isn't a property available for showcasing.</h3>
                        </div>
                }
        </div>
    );
};

export default UserProperty;