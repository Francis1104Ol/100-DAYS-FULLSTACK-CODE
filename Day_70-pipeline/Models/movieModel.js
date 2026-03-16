const mongoose = require('mongoose');

const movieSchema =new mongoose.Schema({
    name :{
        type: String,
        required: [true, "Name is a required field"],
        unique: true,
        trim:true
    },
    description: {
        type: String,
        required: [true, "Description is Required"],
        trim:true
    },
    duration:{
        type:Number,
        required: [true, "Duration is required"] //validator
    },
    ratings:{
        type:Number,
    },
    totalRatings:{
        type:Number
    },
    releaseYear:{
        type:Number,
        required: [true, "Release Year is required"] 
    },
    releaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    genres:{
        type:[String],
        required:[true, 'Genres is required']
    },
    directors:{
        type:[String],
        required:[true, 'Directors is required']
    },
    coverImage:{
        type:String,
        required:[true, 'Cover Image is Required!']
    },
    actors:{
        type:[String],
        required:[true, 'actors is required']
    },
    price:{
        type: Number,
        required:[true,'Price is Required']
    }
});

const Movie =mongoose.model('movie', movieSchema);
module.exports = Movie;