import React, {useState} from "react";
import { useToast} from '@chakra-ui/react'

import "./UserAuthentication.css";


const UserAuthentication = () => {
   // mode = false for signup and true for login

    const toast = useToast();
    const [mode,setMode] = useState(false);
    const [isEmail,setIsEmail] = useState("");
    const [isName,setIsName] = useState("");
    const [isPassword,setIsPassword] = useState("");

    const handleRequest = async(e) =>{
        e.preventDefault();
        console.log(isEmail);
        console.log(isPassword);
        if(mode){
            try{
                const response = await fetch("http://localhost:5000/users/login",{
                    method: "POST",
                    headers:{
                        "Content-type": "application/json",
                    },
                    body:JSON.stringify({
                        email: isEmail,
                        password: isPassword
                    })
                })
                const responseData = await response.json();
                if(!response.ok) throw new Error(responseData.message);
            }catch (err){
                console.log(err);
            }
        }else{
            try{
                const response = await fetch("http://localhost:5000/users/signup",{
                    method: "POST",
                    headers:{
                        "Content-type": "application/json",
                    },
                    body:JSON.stringify({
                        name:isName,
                        email: isEmail,
                        password: isPassword
                    })
                })
                const responseData = await response.json();
                if(!response.ok) throw new Error(responseData.message);

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