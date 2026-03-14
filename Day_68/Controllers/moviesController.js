const Movie = require('./../Models/movieModel')

exports.getHighestRated=(req, res, next)=>{
            req.query.limit ='5';
            req.query.sort='-ratings'
            next();
         }
exports.getAllMovies =async (req, res)=>{
    try{
         
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
//Limiting Fields 
if(req.query.fields){
    //query.select('name duration price ratings' )
    const fields =req.query.fields.split(',').join(' ');
    console.log(fields)
   query = query.select(fields)
} else{
    query = query.select('-__v')
}
//Pagination 
const page =req.query.page*1 || 1;
const limit =req.query.limit*1||10;
//in page 1 display 1-10 page 2 display 11-20
const skip =(page-1)*limit
query= query.skip(skip).limit(limit);
if(req.query.page){
    const moviesCount =await Movie.countDocuments()
    if(skip>=moviesCount){
        throw new Error('This Page is not found')
    }
}
const movies =await query
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