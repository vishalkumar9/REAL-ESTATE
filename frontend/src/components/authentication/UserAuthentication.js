import React, {useState,useContext} from "react";
import {useNavigate} from "react-router-dom";

import "./UserAuthentication.css";
import {AuthContext} from "../context/AuthContext";


const UserAuthentication = () => {
   // mode = false for signup and true for login

    const AuthC = useContext(AuthContext);

    let navigate = useNavigate();
    const [mode,setMode] = useState(false);
    const [isEmail,setIsEmail] = useState("");
    const [isName,setIsName] = useState("");
    const [isPassword,setIsPassword] = useState("");

    const handleRequest = async(e) =>{
        e.preventDefault();
        if(mode){
            try{
                const formData = new FormData();
                formData.append("email",isEmail);
                formData.append("password",isPassword);

                const response = await fetch("http://localhost:5000/users/login",{
                    method: "POST",
                    body:formData,
                })
                const responseData = await response.json();
                if(!response.ok) throw new Error(responseData.message);

                AuthC.login(responseData.userId,responseData.userName,responseData.token);
                navigate("/");
            }catch (err){
                console.log(err);
            }
        }else{
            try{

                const formData = new FormData();
                formData.append("name",isName);
                formData.append("email",isEmail);
                formData.append("password",isPassword);

                const response = await fetch("http://localhost:5000/users/signup",{
                    method: "POST",
                    body:formData,
                })
                const responseData = await response.json();
                console.log(responseData.message);
                if(!response.ok) throw new Error(responseData.message);
                AuthC.login(responseData.userId,responseData.userName,responseData.token);
                navigate("/");
            }catch (err){
                console.log(err);
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

    return (
        <div className="userAuth-div">
            <div className="userAuth-main-div">
                <div className="userAuth-input-div">
                    <h1>{mode ? "Log In" : "Sign Up"}</h1>
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
                {mode && <button onClick = {handleModeChangeClick} >Sing Up</button>}
                {!mode && <button onClick = {handleModeChangeClick}>Log In</button>}
            </div>
        </div>
    );
}
export default UserAuthentication;