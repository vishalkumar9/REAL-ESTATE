const Property = require("../schema/propertySchema");
const User = require("../schema/userSchema");
const Location = require("../schema/locationSchema");

const mongoose = require("mongoose");
const HttpError = require("../schema/httpError");
const fs = require("fs");


const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECRET,
});



const uploadProperty = async(req,res,next) => {

    let data = req.body;
    const userId = req.userData.userId;
    const property = new Property(data);
    const images = req.body.image;
    const session = await mongoose.startSession();
    session.startTransaction();


    try{
        const user = await User.findById(userId).session(session);

        user.properties.push(property.id);
        await user.save({ session });

        const uploader = async (path) => await cloudinary.uploader.upload(path, {folder: property.id});
        for(const file of images) {
            const {filepath} = file;
            const newPath = await uploader(filepath);

            property.images.push(newPath.url);
            fs.unlinkSync(filepath);
        }
        property.user = user;
        await property.save({ session });
        await session.commitTransaction();

    } catch (err) {

        await cloudinary.api.delete_resources_by_prefix(property.id);
        await cloudinary.api.delete_folder(property.id);

        await session.abortTransaction();
        const error = new HttpError("property could not uploaded", 500);
        return next(error);

    } finally {
        session.endSession();
    }
    res.status(201).json({message : "property uploaded successfully"});
}


const searchProperty = async(req,res,next) => {
    console.log(req.query);
    const location = req.query.location;
    let properties;
    try{
        properties = await Property.find({
                $or: [
                    { city: { $regex: new RegExp(location || "", "i") } },
                    { location: { $regex: new RegExp(location || "", "i") } }
                ],
        },
        "city location streetNo pinCode purposeType type price images"
        ).populate("user").exec();
        res.status(200).json({properties:properties});
    }catch (err){
        const error = new HttpError("Property Could Not Uploaded", 500);
        return next(error);
    }
}

const searchPropertyById = async(propertyId) => {
    try{
        const property = await Property.findOne({_id:propertyId}).populate("user",{_id:1}).exec();
        return property;
    }catch (err){
        throw new HttpError("Something Went Wrong while searching property using propertyId",500);
    }

}

const getPropertyById = async(req,res,next) => {
    const propertyId = req.query.propertyId;
    try{
        const property = (await searchPropertyById(propertyId));
        res.status(200).json({property});
    }catch (err){
        const error = new HttpError("Something Went Wrong while fetch details using propertyId",500);
        next(error);
    }
}

const getAvailableLocations = async(req,res,next) => {
    try{
        const locations = await Location.find();
        res.status(200).json({locations:locations});
    }catch (err){
        const error = new HttpError("Something Went Wrong while fetching location",500);
        return next(error);
    }
}

const getPropertyByUserId = async(req,res,next) => {
    const userId = req.query.userId;
    try {
        const user = await User.findOne({_id: userId});
        if(!user){
            throw new HttpError("User Not Found",404);
        }

        let propertyDetails;

        if(user.properties.length!==0) {
            const properties = user.properties;
            propertyDetails = await Promise.all(
                properties.map((property) => searchPropertyById(property._id))
            );
        }
        res.status(200).json({ properties: propertyDetails || [],name:user.name,email:user.email,profileImage:user.profileImage});
    }catch (err){
        const error = new HttpError("Something Went Wrong while fetching user properties",500);
        next(error);
    }
}


exports.uploadProperty = uploadProperty;
exports.searchProperty = searchProperty;
exports.getPropertyById = getPropertyById;
exports.getAvailableLocations = getAvailableLocations;
exports.getPropertyByUserId = getPropertyByUserId;