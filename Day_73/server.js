const mongoose = require('mongoose');

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
// });  

const app = require('./app')
// console.log(app.get('env'))
//console.log(process.env)
//Create a server 

app.listen(port,()=>{
    console.log('server has started....')
})
