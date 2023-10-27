import React, {useState,useContext} from "react";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../context/AuthContext";

import "./UserAuthentication.css";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Avatar} from "@mui/material";

import im1 from "../image/houseImg1.jpg";
import im2 from "../image/houseImg2.webp";

const UserAuthentication = () => {

    const AuthC = useContext(AuthContext);

    let navigate = useNavigate();
    const [mode,setMode] = useState(false);
    const [isEmail,setIsEmail] = useState("");
    const [isName,setIsName] = useState("");
    const [isPassword,setIsPassword] = useState("");
    const [profileImage,setProfileImage] = useState([]);
    const [displayImage,setDisplayImage] = useState();
    const handleRequest = async(e) =>{
        e.preventDefault();
        if(mode){
            try{
                const formData = new FormData();
                formData.append("email",isEmail);
                formData.append("password",isPassword);

                const response = await fetch(`${process.env.REACT_APP_BACKEND_USER_URL}/login`,{
                    method: "POST",
                    body:formData,
                });

                const responseData = await response.json();
                if(!response.ok) throw new Error(responseData.message);

                AuthC.login(responseData.userId,responseData.userName,responseData.email,responseData.token);

                navigate("/");
            }catch (err){
                toast.error("Login Failed",{autoClose:1000});
            }
        }else{
            try{

                const formData = new FormData();
                formData.append("name",isName);
                formData.append("email",isEmail);
                formData.append("password",isPassword);
                for (const file of profileImage) {
                    formData.append('image', file);
                }

                console.log(formData);

                const response = await fetch(`${process.env.REACT_APP_BACKEND_USER_URL}/signup`,{
                    method: "POST",
                    body:formData,
                })
                const responseData = await response.json();
                if(!response.ok) throw new Error(responseData.message);
                AuthC.login(responseData.userId,responseData.userName,responseData.email,responseData.token);
                navigate("/");

            }catch (err){
                toast.error("SignUp Failed",{autoClose:1000});
            }
        }
    }

    const handleModeChangeClick = () =>{
        setMode(!mode);
    }
    const handelNameChange = (e) =>{
        setIsName(e.target.value)
    }
    const handelEmailChange = (e) =>{
        setIsEmail(e.target.value);
    }
    const handelPasswordChange = (e) =>{
        setIsPassword(e.target.value);
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
        setDisplayImage(previewImages);
        setProfileImage(files);
    }

    return (
        <div className="upperdiv">
            <div className="header">
                <h1>Discover Your Dream Home Today!</h1>
                <h2>"Search, Explore, and Find Your Perfect Property"</h2>
                <div className="image_show">
                    <img src={im1} alt=""/>
                    <img src={im2} alt=""/>
                </div>
            </div>
            <div className="userAuth-div">
                <div className="userAuth-main-div">
                    <ToastContainer/>
                    <div className="userAuth-input-div">
                        <h1>{mode ? "Log In" : "Sign Up"}</h1>
                        {!mode && displayImage && <Avatar src={displayImage[0]} id="user_profile_image"/>}
                        {!mode && <label>Profile Pic</label>}
                        {!mode &&  <input className="image_select" type="file" accept="image/jpg, image/png, image/jpeg" onChange={handleFileChange}/>}
                        {!mode && <label>Name</label>}
                        {!mode && <input type="name" placeholder="Name" onChange={handelNameChange}/>}
                        <label>Email</label>
                        <input type="email" placeholder="Email" onChange={handelEmailChange}/>
                        <label>Password</label>
                        <input type="password" placeholder="password" onChange={handelPasswordChange}/>
                        {!mode && <button onClick={handleRequest}>Sing Up</button>}
                        {mode && <button onClick={handleRequest}>Log In</button>}
                    </div>
                </div>
                <div className="userAuth-mode-div">
                    {mode && <button className="signUp" onClick = {handleModeChangeClick} >Sing Up</button>}
                    {!mode && <button className="logIn" onClick = {handleModeChangeClick}>Log In</button>}
                </div>
            </div>
        </div>
    );
}
export default UserAuthentication;