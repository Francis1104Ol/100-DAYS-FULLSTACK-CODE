const mongoose = require('mongoose');
const fs = require('fs')
const validator = require('validator')
const movieSchema =new mongoose.Schema({
    name :{
        type: String,
        required: [true, "Name is a required field"],
        unique: true,// unique is not a validator
        trim:true,
        maxLength:[100,"Movie name must not have more than 100 character"],
        minLength:[4, "Movie name must not be less than 4"],//MINLENGTH AND MAXLENGTH CAN ONLY WORK ON TYE STRING
        validate:[validator.isAlpha, "name should only contain an alphabet"] //THIRD PARTY VALIDATOR
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
        // min:[1, "Ratings must not be 1.0 or above"], //validator for type number
        // max:[10, "Ratings must  be 10.0 or less"] built in validator
        //custom validator
        validate:{
            validator:
            function(value){
           return value>=1 && value <=10;
           
        },
        message:"Ratings ({VALUE}) should be above 1 or below 10"
    }
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
        required:[true, 'Genres is required'], // A DATA VALIDATOR
        // enum: {// only on string types 
        //     values:["Action", "Comedy", "Drama", "Thriller", "Horror", "Sci-Fi", "Romance", "Adventure"], //also a validator to indicate accepted genre
        //     message:"This genre does not exit"
        // }
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
    },
    createdBy:String
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}//this output the duration in hour fields on the object also NOTE YOU CAN'T USE VIRTUAL PROPERTIES TO QUERY DATA BECAUSE IT IS NOT PRESENT IN THE DATABASE
});
//CREATING A VIRTUAL PROPERTIES
movieSchema.virtual('durationInHours').get(function(){
    return this.duration/60;
})

movieSchema.pre('save', function(next) {
    this.createdBy= 'Francis'
    
})

movieSchema.post('save', function(doc){
    const content=`A new movie document with name ${doc.name} has been created by ${doc.createdBy}\n`;
    fs.writeFileSync('./log/log.txt', content,{flag:'a'}, (err)=>{
        console.log(err.message)
    })
})

//USING UNSHIFT ADD DATA TO THE BEGINNINIG OF AN ARRAY
movieSchema.pre('aggregate', function(){
    console.log(this.pipeline().unshift({$match:{releaseDate:{$lte:new Date()}}}))
})
const Movie =mongoose.model('movie', movieSchema);
module.exports = Movie;