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
        required: true
    },
    type: {
        type: String,
        required: true
    },
    constructionStatus: {
        type: String,
        required: function (){
            return this.type!=="Plot" && this.type!=="Agricultural Land";
        }
    },
    ageOfProperty: {
        type: String,
        required: false
    },
    bhk: {
        type: String,
        required: function (){
            return this.purposeType === "Residential";
        }
    },
    countOfBathroom: {
        type: String,
        required: function (){
            return this.type!=="Plot" && this.type!=="Agricultural Land";
        }
    },
    monthlyRent: {
        type: String,
        required: function (){
            return this.purposeType !== "Sell";
        }
    },
    builtUpArea: {
        type: String,
        required: true
    },
    propertyPrice: {
        type: String,
        required: function (){
            return this.purposeType === "Sell";
        }
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
            return this.type!=="Plot" && this.type!=="Agricultural Land";
        }
    },
    pgFor: {
        type: String,
        required: function (){
            return this.purposeType === "PG/Co-Living";
        }
    },
    suitedFor: {
        type: String,
        required: function (){
            return this.purposeType === "PG/Co-Living";
        }
    },
    state:{
        type:String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    landmark:{
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
