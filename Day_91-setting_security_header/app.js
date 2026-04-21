//Import expresss
const express = require('express');

const CustomError = require('./Utils/CustomError')
const globalErrorHandler = require('./Controllers/errorController')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const moviesRouter= require('./Routes/moviesRoutes');
const authRouter =require('./Routes/authRouter')
const userRoute= require('./Routes/userRoutes')
const helmet = require('helmet');
const hpp = require('hpp')
//const sanitize = require('express-mongo-sanitize');
//const xss =require('xss-clean')



const app = express();


app.use(helmet())
let limiter = rateLimit({
    max:10,
    windowMs:60*60*1000,
    message:'we have recieved too many request from this ip please try after 1 hour'
});

app.use('/api', limiter)
app.use(express.json({limit:'10kb'}))
app.set('query parser', 'extended');
if(process.env.NODE_ENV=='development'){
app.use(morgan('dev'))
}

//app.use(sanitize())
//app.use(xss());
app.use(hpp({whitelist:[
    'durations',
    'ratings', 
    'releaseYear',
    'releaseDate', 
    'genres',
    'actors',
    'price'
]}))
app.use(express.static('./public'))//static file


app.use((req, res, next)=>{
    req.requestedAt = new Date().toISOString();
    next( )
})





app.use('/api/v1/movies', moviesRouter)// mounting route
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRoute)
//Default URL:must be the last in the define route
app.use((req, res, next) => {

    const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404)
    next(err)

});
app.use(globalErrorHandler)
module.exports= app;

 