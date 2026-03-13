const Movie = require('./../Models/movieModel')

exports.getAllMovies =async (req, res)=>{
    try{
         
        //This Work with MONGO 6.0 OR LESS
        /* const excludeFields =['sort', 'page', 'limit', 'fields'];

         const queryObj ={...req.query};//shallow copy
         excludeFields.forEach((el)=>{
            delete queryObj[el]
         })

         //console.log(queryObj)
         
       // const movies= await Movie.find(queryObj);// one way of filtering which might not work when passing some query string with which we do not have a field in the movie object **/
        //WORK WITH MONGO 7.0 AND ABOVE 
       
        console.log(req.query)
        let queryStr =  JSON.stringify(req.query)
        queryStr =  queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`);  //replace all 
        const queryObj = JSON.parse(queryStr);
         const excludeFields =['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach((el)=>{
            delete queryObj[el]
         })
       // console.log(queryObj)
let query =  Movie.find(queryObj)
       //Sorting Logic
if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
}else{
    query = query.sort('-createdAt');
}
if(req.query.fields){
    //query.select('name duration price ratings' )
    const fields =req.query.fields.split(',').join(' ');
    console.log(fields)
   query = query.select(fields)
} else{
    query = query.select('-__v')
}

         const movies =await query
        //Another Way using moongoose special method
        //   const movies= await Movie.find()
        //   .where('duration').gte(req.query.duration)
        //   .where('ratings').gte(req.query.ratings)
        // .where('price').gte(req.query.price)
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