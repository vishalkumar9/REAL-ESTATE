const Property = require("../schema/propertySchema");
const User = require("../schema/userSchema");
const mongoose = require("mongoose");
const HttpError = require("../schema/httpError");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dnqeab4eh",
    api_key: "962127957532697",
    api_secret: "q-kBOMC4iQJw7OehioJ_-OEdRts"
});



const uploadProperty = async(req,res,next) => {

    const data = req.body;
    const userId = req.userData.userId;
    const property = new Property(data);
    const images = req.body.image;
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const user = await User.findById(userId).session(session);
        user.properties.push(property.id);
        property.user = userId;

        await user.save({ session });

        const uploader = async (path) => await cloudinary.uploader.upload(path, {folder: property.id});

        for (const file of images) {
            const { filepath } = file;
            const newPath = await uploader(filepath);
            property.images.push(newPath.url);
            fs.unlinkSync(filepath);
        }

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

const getProperty = async(req,res,next) => {

}

exports.uploadProperty = uploadProperty;
exports.getProperty = getProperty;