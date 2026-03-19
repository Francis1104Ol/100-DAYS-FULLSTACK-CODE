//Import expresss
const express = require('express');
const app = express();
const CustomError = require('./Utils/CustomError')
const globalErroeHandler = require('./Controllers/errorController')
const morgan = require('morgan')
const moviesRouter= require('./Routes/moviesRoutes');
//Route Handler Functions

const logger =function(req, res, next){
    console.log('custom middleware called')
    next()
    
}
app.use(logger)
app.use(express.json())
app.set('query parser', 'extended');
if(process.env.NODE_ENV=='development'){
app.use(morgan('dev'))
}
app.use(express.static('./public'))//static file

//app.use(morgan('combined'))
//app.use(morgan('common'))
//app.use(morgan('short'))
//app.use(morgan('tiny'))

app.use((req, res, next)=>{
    req.requestedAt = new Date().toISOString();
    next( )
})

app.use('/api/v1/movies', moviesRouter)// mounting route
//Default URL:must be the last in the define route
app.use((req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.statusCode = 404;
    // err.status = 'fail';
    // next(err);
    // const err = new Error(`Can't find ${req.originalUrl} on the server`);
    // err.status= 'fail';
    // err.statusCode= 404;
    const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404)
    next(err)

});
//GLOBAL ERROR HANDLING 
// app.use((error, req, res, next)=>{
//     error.statusCode = error.statusCode || 500
//     error.status = error.status||'error'
//     res.status(error.statusCode).json({
//         status:error.statusCode,
//         message:error.message

//     })
// })
app.use(globalErroeHandler)
module.exports= app;

 