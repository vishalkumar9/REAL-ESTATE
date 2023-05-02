const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    city : {type: String, required: true},
    locations: [{type:String}]
});

locationSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Location",locationSchema);