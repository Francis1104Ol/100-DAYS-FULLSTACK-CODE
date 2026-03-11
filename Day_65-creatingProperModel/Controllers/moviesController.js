const Movie = require('./../Models/movieModel')

exports.getAllMovies =async (req, res)=>{
    try{
 const movies= await Movie.find();
 res.status(200).json({
    status:'success',
    length:movies.length,
    data:{
        movies
    }
 })
    }catch(err){
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
}
exports.createMovie = async (req, res) =>{
//   const testMovie = new Movie({});
//   testMovie.save()
//new way to create movie
try{
 const movie = await Movie.create(req.body); //using await to wait for the create method
 res.status(201).json({
    status :'success',
    data:{
        movie
    }
 })
}catch(err){
    res.status(400).json({
        status: 'Fail',
        message: err.message
    })
}
};




//GET - api/v1/movies -- For ROute parameter
//app.get('/api/v1/movies/:id/:name/:x', (req, res) =>{  //the ? will make the route parameter optional
exports.getMovie = async (req, res) =>{ 
      try{
//   const movie = await movie.find({_id:req.params.id})
 const movie = await Movie.findById(req.params.id);
 res.status(200).json({
    status:'success',
    data:{
        movie
    }
 })
}catch(err){
 res.status(400).json({
        status: 'Fail',
        message: err.message
    })
}}
exports.deleteMovie= async(req, res)=>{
    try{
         await Movie.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:"success",
            data: null
        })
    }catch(err){
         res.status(404).json({
            status:"Fail",
            message: err.message
        })

    }
}
exports.updateMovie =async (req,res) =>{
    try{
        const updatedMovie= await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
        res.status(200).json({
            status:"success",
            data: {
                movie: updatedMovie
            }
        })
    }catch(err){
        res.status(404).json({
            status:"Fail",
            message: err.message
        })
    }
   
}