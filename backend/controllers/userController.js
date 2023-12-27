const User = require("../schema/userSchema"); // have predefined schema os user
const HttpError = require("../schema/httpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECRET,
});


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
            process.env.SECRETKEY,
            { expiresIn: "24h" }
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
    console.log(req.body);
    // this function is responsible for user signup
    const {name,email,password,image} = req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email:email});
    }catch (err){
        console.log(err,"1");
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
        console.log(err,"2");
        const error = new HttpError("Sign up failed, please try again later",500);
        return next(error);
    }

    const createdNewUser = new User({
        name,
        email,
        password:hashPassword,
        profileImage:null,
    });

    let public_Id;

    try {
        const uploader = async (path) => await cloudinary.uploader.upload(path);
        const newPath = await uploader(image.filepath);
        createdNewUser.profileImage = newPath.url;
        public_Id = newPath.public_id;
        await createdNewUser.save();

    }catch (err){
        console.log(err,"3");
        await cloudinary.uploader.destroy(public_Id);
        const error = new HttpError("sign up failed, please try again later",500);
        return next(err);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdNewUser.id, email: createdNewUser.email },
            process.env.SECRETKEY,
            { expiresIn: "24h" }
        );
    } catch (err) {
        console.log(err,"4");
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

