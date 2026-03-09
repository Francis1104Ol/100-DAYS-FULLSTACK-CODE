const mongoose = require('mongoose');
// const port = 1000
const dotenv= require('dotenv')
dotenv.config({path:'./config.env'})

mongoose.connect(process.env.CONN_STR)
.then(() => {
    console.log('DB connection Success');
})
.catch((err) => {
    console.log('DB connection error:', err);
});
const port = process.env.PORT || 1000;

//Creating a schema :basic way of creating schema
// const movieSchema =new mongoose.Schema({
//     name :String,
//     description: String,
//     duration:Number,
//     ratings:Number
// }); another way of creating it 
const movieSchema =new mongoose.Schema({
    name :{
        type: String,
        required: [true, "Name is a required fiels"],
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

const Movie =mongoose.model('movie', movieSchema) // model name must start with caps
//creating document from model
const testMovie = new Movie({
    name: 'Die Hard',
    description: "Action packed movie staring bruce willis in this trilling adventure.",
    duration: 139,
    ratings:4.5
})
testMovie.save()
.then(doc=>{
    console.log(doc)
}).catch(err =>{
    console.log("Error occured:" +err)
})
const app = require('./app')
// console.log(app.get('env'))
//console.log(process.env)
//Create a server 

app.listen(port,()=>{
    console.log('server has started....')
})
