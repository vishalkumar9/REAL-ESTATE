const User = require("../schema/userSchema"); // have predefined schema os user
const HttpError = require("../schema/httpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../config");

const userLogin = async(req,res,next)=>{
    // this function is responsible for user login

    const {email, password} = req.body;

    let existingUser, isValidPassword=true;

    try{
        existingUser = await User.findOne({email:email});

    }catch (err){
        const error = new HttpError("Login failed, please try again later1",500);
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError(
            "Invalid credentials, could not log you in1.",
            401
        );
        return next(error);
    }

    try{
         isValidPassword = await bcrypt.compare(password,existingUser.password);
    }catch(err){
         const error = new HttpError("Login failed, please try again later2",500);
         return next(error);
     }

    if(!isValidPassword){
        const error = new HttpError("Invalid credentials, could not log you in.", 401);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            Config.SECRET_KEY,
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError("Log in failed, please try again.", 500);
        return next(error);
    }

    res.json({
        userName: existingUser.name,
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
    });

};

const userSignup = async (req,res,next)=>{
    // this function is responsible for user signup

    console.log(req.body);
    const {name,email,password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email:email});
    }catch (err){

        const error = new HttpError("Sign up failed, please try again later",500);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError("User already exist, please try login or use new email for signup",422);
        return next(error);
    }

    let hashPassword;

    try {
        hashPassword = await bcrypt.hash(password,12);
    }catch (err){
        const error = new HttpError("Sign up failed, please try again later",500);
        return next(error);
    }

    const createdNewUser = new User({
        name,
        email,
        password:hashPassword
    });

    try {
        await createdNewUser.save();
    }catch (err){
        const error = new HttpError("sign up failed, please try again later",500);
        return next(err);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdNewUser.id, email: createdNewUser.email },
            Config.SECRET_KEY,
            { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpError("Signing up failed, please try again.", 500);
        return next(error);
    }

    res
        .status(201)
        .json(
            {
                userName: createdNewUser.name,
                userId: createdNewUser.id,
                email: createdNewUser.email,
                token: token });
}

exports.userLogin = userLogin;
exports.userSignup = userSignup;

