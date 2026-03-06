//Import expresss
const express = require('express');
let app = express();

const morgan = require('morgan')
const moviesRouter= require('./Routes/moviesRoutes');
//Route Handler Functions

const logger =function(req, res, next){
    console.log('custom middleware called')
    next()
    
}
app.use(logger)
app.use(express.json())
app.use(morgan('dev'))
//app.use(morgan('combined'))
//app.use(morgan('common'))
//app.use(morgan('short'))
//app.use(morgan('tiny'))

app.use((req, res, next)=>{
    req.requestedAt = new Date().toISOString();
    next( )
})

app.use('/api/v1/movies', moviesRouter)// mounting route
module.exports= app;