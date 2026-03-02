//Import expresss
const express = require('express');
let app = express();
const port = 1000
const fs = require('fs');
// route = http method + url
//app.get('./',(req, res) =>{
//res.status(200).send('<h4>Hello from express server</h4>')
//res.status(200).json({message:'Hello from express server'})//json object
//}) //first arguement is the url

//handling post request 
//app.post('./', () =>{

//})


// Frontend vs backend i.e client and server
//static and dynamic website dynamic usuallly contain DB and a backend app
//API: application programming interface that cn be use by another piece of software in order to allow application to talk to each other
//web APIs: we send only json data in the response to the client
//REST architecture :
//REST is Representation State Transfer
//Principle of building RESTful api
//1: separate APIs into logical resources 
//2: exposed structure resource based  url
//3: use HTTP methods
//4: send json data in response jsend json data format
//5: they must be stateless stateless in the fact that all state must be handle on the client and not on the server 
// intro to postman 
//API restful
let movies= JSON.parse(fs.readFileSync('./data/movies.json'))
app.get('/api/v1/movies', (req, res)=>{
    res.status(200).json({
        status: 'success',
        count: movies.length,
        data:{
            movies: movies
        }
    })
})

//Create a server 

app.listen(port,()=>{
    console.log('server has started....')
})