const mongoose = require('mongoose');
const dotenv =require('dotenv');
const fs =require('fs');
const Movie =require('./../Models/movieModel');

dotenv.config({path:'./config.env'})
//connect to MONGODB
mongoose.connect(process.env.CONN_STR)
.then(() => {
    console.log('DB connection Success');
})
.catch((err) => {
    console.log('DB connection error:', err);
});

//read the movie.json file

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));// pass the path relative to root directory
//DELETING EXISTING MOVIE DOCUMENTS FROM THE COLLECTION
const deleteMovies =async ()=>{
    try{
       await Movie.deleteMany();
        console.log('Data Successfully deleted!')
    }catch(err){
        console.log(err.message)
    }
    process.exit();
}

//IMPORTING MOVIE DATA TO THE MONGODB COLLECTION
const importMovies =async ()=>{
    try{
       await Movie.create(movies);
        console.log('Data Successfully Imported!')
    }catch(err){
        console.log(err.message)
    }
    process.exit();
}

if(process.argv[2]=== '--import'){
    importMovies();
}
if(process.argv[2]=== '--delete'){
    deleteMovies();
}
// deleteMovies();
// importMovies();