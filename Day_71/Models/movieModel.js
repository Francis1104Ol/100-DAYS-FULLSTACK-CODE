const mongoose = require('mongoose');
const fs = require('fs')
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

//THIS IS DOCUMMENT MIDDLEWARE WHICH IS TAKING THE PRE : THIS WILL BE EXCUTED BEFORE THE DOCUMENT IS SAVE IN THE DATABASE
//NEXT CALL THE NEXT MIDDLEWARE
//THE SAVE WILL ONLY WORK FOR THE SAVE AND CREATE METHOD 
//IT WON'T WORK FOR FINDBYIDANDUPDATE AND INSERTMANY
//ON THE SAVE HOOK YOU CAN ADD AS MANY PRE AND POST MIDDLEWARE AS YOU WANT 
movieSchema.pre('save', function(next) {
    this.createdBy= 'Francis'
    
})

movieSchema.post('save', function(doc){
    const content=`A new movie document with name ${doc.name} has been created by ${doc.createdBy}\n`;
    fs.writeFileSync('./log/log.txt', content,{flag:'a'}, (err)=>{
        console.log(err.message)
    })
})
const Movie =mongoose.model('movie', movieSchema);
module.exports = Movie;