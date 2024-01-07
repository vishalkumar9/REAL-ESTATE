const HttpError = require("../schema/httpError");
const nodemailer = require("nodemailer");

const handlePropertyInterestNotification = (req,res,next) =>{
    res.json({message:"Email Sent"});
}

exports.handlePropertyInterestNotification = handlePropertyInterestNotification;