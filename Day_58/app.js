//Import expresss
const express = require('express');
let app = express();
const port = 1000
const fs = require('fs');
//Route Handler Functions
const getAllMovies = (req, res)=>{
    res.status(200).json({
        status: 'success',
        requestedAt:req.requestedAt,
        count: movies.length,
        data:{
            movies: movies
        }
    })
}
const createMovie = (req, res) =>{
   // console.log(req.body);
   const newId = movies.length > 0
      ? movies[movies.length - 1].id + 1
      : 1;

   const newMovie = Object.assign({ id: newId }, req.body);

   movies.push(newMovie);

   res.status(201).json({
      status: "success",
      data: {
         movie: newMovie
      }
   });
};
let movies= JSON.parse(fs.readFileSync('./data/movies.json'))
//Middleware
app.use(express.json())

//GET - api/v1/movies -- For ROute parameter
//app.get('/api/v1/movies/:id/:name/:x', (req, res) =>{  //the ? will make the route parameter optional
const getMovie = (req, res) =>{ 
   // console.log(req.params);
    const id = + req.params.id //convert to numeric 

   let movie = movies.find(el => el.id === id);
   if(!movie){
 return   res.status(404).json({
        status: 'fail',
        message: 'movie with ID ' +id+ ' is not found'  
    })
   }
    res.status(200).json({
        status : 'success',
        data:{
            movie: movie
        }
    })
}
const deleteMovie= (req, res)=>{
    const id = req.params.id *1
    const movieToDelete= movies.find(el => el.id ===id);

    if(!movieToDelete){
     return  res.status(404).json({
        status:'fail',
        message: 'no movie object with ID '+id+  'is found to delete'
    })
   }
    const index = movies.indexOf(movieToDelete);
    movies.splice(index, 1)

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (erre)=>{
     res.status(204).json({
        status: 'success',
        data:{
            movie: null
        }
    })
})
}
const updateMovie = (req,res) =>{
    let id = req.params.id * 1
   let movieToUpdate =  movies.find(el => el.id ===id);
if(!movieToUpdate){
     return  res.status(404).json({
        statu:'fail',
        message: 'no movie object with ID '+id+ 'is found'
    })
   }
let index = movies.indexOf(movieToUpdate)
Object.assign(movieToUpdate,req.body) // to mtch 2 object
movies[index] = movieToUpdate;
fs.writeFile('./data/movies.json', JSON.stringify(movies), (erre)=>{
     res.status(200).json({
        status: 'success',
        data:{
            movie: movieToUpdate
        }
    })
})
}
// app.get('/api/v1/movies', getAllMovies)
// app.get('/api/v1/movies/:id', getMovie )
// //POST REQUEST 
// app.post('/api/v1/movies', createMovie)

//Route Parameter are name url segments thaat are used to capture the values specified at their position
//Custome middleware
const logger =function(req, res, next){
    console.log('custome middleware called')
    next()
    
}
app.use((req, res, next)=>{
    req.requestedAt = new Date().toISOString();
    next( )
})
app.use(logger)
//UPDATING A RESOURCE USING PATCH OR PUT
//PATCH: is a method of modifying resources where the clients sends partial data that is to be uploaded without modifying the entire content
//PUT: is a method of modifying resources where the clients sends data to updates the entire resources 

// app.patch('/api/v1/movies/:id', updateMovie)
// app.delete('/api/v1/movies/:id', deleteMovie )

app.route('/api/v1/movies')
.get(getAllMovies)
.post(createMovie)

app.route('/api/v1/movies/:id')
.get(getMovie)
.patch(updateMovie)
.delete(deleteMovie)
//Create a server 

app.listen(port,()=>{
    console.log('server has started....')
})

//working with middleware :it is a function that always recieve 3 arguments the req,res, and next
//collections of middleware is called middleware stack
//the order of the declaration of a middleware mattters 
//creating a custom middleware
// const logger =function(req, res, next){
//     console.log('custome middleware called')
//     next()
    
// }
// app.use(logger)