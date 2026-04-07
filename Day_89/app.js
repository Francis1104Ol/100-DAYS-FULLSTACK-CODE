//Import expresss
const express = require('express');
const app = express();
const CustomError = require('./Utils/CustomError')
const globalErrorHandler = require('./Controllers/errorController')
const morgan = require('morgan')
const moviesRouter= require('./Routes/moviesRoutes');
const authRouter =require('./Routes/authRouter')
const userRoute= require('./Routes/userRoutes')

//Route Handler Functions

// const logger =function(req, res, next){
//     console.log('custom middleware called')
//     next()
    
// }
//app.use(logger)
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
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRoute)
//Default URL:must be the last in the define route
app.use((req, res, next) => {

    const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404)
    next(err)

});
app.use(globalErrorHandler)
module.exports= app;

 