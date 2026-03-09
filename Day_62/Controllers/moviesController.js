const fs = require('fs');
let movies= JSON.parse(fs.readFileSync('./data/movies.json'))
exports.checkId= (req, res,next,value )=>{
    console.log('movie ID is ' + value)
    //find movie base on parameter
    let movie = movies.find(el => el.id === value*1);
    
    if(!movie){
        return   res.status(404).json({
        status: 'fail',
        message: 'movie with ID ' +value+ ' is not found'  
    })
   }
   next()
}

exports.validateBody = (req, res, next)=>{
    if(!req.body.name ||! req.body.releaseYear){
       return res.status(400).json({
            status: 'fail',
            message:'not a valid movie data'
        });
    }
    next();
}

exports.getAllMovies = (req, res)=>{
    res.status(200).json({
        status: 'success',
        requestedAt:req.requestedAt,
         data:{
            movies: movies
        }
    })
}
exports.createMovie = (req, res) =>{
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

//Middleware


//GET - api/v1/movies -- For ROute parameter
//app.get('/api/v1/movies/:id/:name/:x', (req, res) =>{  //the ? will make the route parameter optional
exports.getMovie = (req, res) =>{ 
   // console.log(req.params);
    const id = + req.params.id //convert to numeric 

  let movie = movies.find(el => el.id === id);
//    if(!movie){
//  return   res.status(404).json({
//         status: 'fail',
//         message: 'movie with ID ' +id+ ' is not found'  
//     })
//    }
    res.status(200).json({
        status : 'success',
        data:{
            movie: movie
        }
    })
}
exports.deleteMovie= (req, res)=>{
    const id = req.params.id *1
    const movieToDelete= movies.find(el => el.id ===id);

//     if(!movieToDelete){
//      return  res.status(404).json({
//         status:'fail',
//         message: 'no movie object with ID '+id+  'is found to delete'
//     })
//    }
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
exports.updateMovie = (req,res) =>{
    let id = req.params.id * 1
   let movieToUpdate =  movies.find(el => el.id ===id);
// if(!movieToUpdate){
//      return  res.status(404).json({
//         status:'fail',
//         message: 'no movie object with ID '+id+ 'is found'
//     })
//    }
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