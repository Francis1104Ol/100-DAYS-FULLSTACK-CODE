const mongoose = require('mongoose');

const movieSchema =new mongoose.Schema({
    name :{
        type: String,
        required: [true, "Name is a required field"],
        unique: true
    },
    description: String,
    duration:{
        type:Number,
        required: [true, "Duration is required"] //validator
    },
    ratings:{
        type:Number,
        default:1.0
    }
});

const Movie =mongoose.model('movie', movieSchema);
module.exports = Movie;