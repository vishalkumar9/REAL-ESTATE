const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    user :{
        type: Schema.Types.ObjectId,
        ref:'User'
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
    price: {
        type: String,
        required: true,
        index: true,
    },
    description:{
        type: String,
        required: true,
        index: true,
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
    streetNo:{
        type:String,
        required: true
    },
    images:[{type:String}],
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
