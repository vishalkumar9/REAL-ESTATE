const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    user :{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    propertyType: {
        type: String,
        required: true
    },
    purposeType: {
        type: String,
        required: true,
        index: true,
    },
    type: {
        type: String,
        required: true,
        index: true,
    },
    constructionStatus: {
        type: String,
        required: function (){
            return this.type!=="Plot";
        }
    },
    ageOfProperty: {
        type: String,
        required: false
    },
    bhk: {
        type: String,
        required: function (){
            return this.propertyType === "Residential";
        }
    },
    countOfBathroom: {
        type: String,
        required: function (){
            return this.type!=="Plot" && this.propertyType!=="Commercial";
        }
    },
    builtUpArea: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        index: true,
    },
    length: {
        type: String,
        required: false
    },
    width: {
        type: String,
        required: false
    },
    furnishType: {
        type: String,
        required: function (){
            return this.type!=="Plot" && this.propertyType!=="Commercial";
        }
    },
    city:{
        type: String,
        required: true,
        index: true,
    },
    location:{
        type:String,
        required: true
    },
    pinCode:{
        type:String,
        required: true
    },
    houseNo:{
        type:String,
        required: true
    },
    images:[{type:String}],
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
