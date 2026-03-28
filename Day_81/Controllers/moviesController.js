const Movie = require('../Models/movieModel')
const {param} =require('../Models/movieModel')
const asyncErrorHandler = require('../Utils/asyncErrorHandler')
const ApiFeatures = require('../Utils/ApiFeatures')
const customError=require('../Utils/CustomError')
exports.getHighestRated=(req, res, next)=>{
            req.query.limit ='5';
         req.query.sort='-ratings'
            next();
         }
exports.getAllMovies =asyncErrorHandler(async (req, res, next)=>{
   
        const features = new ApiFeatures(Movie.find(), req.query).filter().sort().limitFields().paginate()// instantiating the apifeatures class
        let movies =await features.query
 res.status(200).json({
    status:'success',
    length:movies.length,
    data:{
        movies
    }
 })
})


exports.createMovie = asyncErrorHandler(async (req, res, next) =>{
 const movie = await Movie.create(req.body); 
 res.status(201).json({
    status :'success',
    data:{
        movie
    }
})
})




exports.getMovie = asyncErrorHandler(async (req, res, next) =>{ 
    
//   const movie = await movie.find({_id:req.params.id})
 const movie = await Movie.findById(req.params.id);

 if(!movie){
    const error = new customError('Movie with that ID is not found', 404)
    return next(error)
 }
 res.status(200).json({
    status:'success',
    data:{
        movie
    }
 })
 })
exports.deleteMovie=asyncErrorHandler( async(req, res, next)=>{
    
       const deletedMovie=  await Movie.findByIdAndDelete(req.params.id)
                if(!deletedMovie){
    const error = new customError('Movie with that ID is not found', 404)
    return next(error)
 }
        res.status(204).json({
            status:"success",
            data: null
        })   
})
exports.updateMovie =asyncErrorHandler(async (req,res, next) =>{
        const updatedMovie= await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})// IF YOU SET THE VALIDATOR TO FALSE THE VALIDATION WILL NOT WORK ON IT
        
         if(!updatedMovie){
    const error = new customError('Movie with that ID is not found', 404)
    return next(error)
 }
        res.status(200).json({
            status:"success",
            data: {
                movie: updatedMovie
            }
        })  
})
exports.getMovieStats = asyncErrorHandler(async(req, res, next) =>{
        const stats = await Movie.aggregate([
            //{$match:{releaseDate:{$lte:new Date()}}}, use aggregation middleware instead 
            {$match : {ratings:{$gte:4.5}}},
            {$group:{_id:'$releaseYear',
                avgRatings:{$avg:'$ratings'},
                avgPrice:{$avg: '$price'},
                minPrice:{$min: '$price'},
                maxPrice:{$max: '$price'},
                totalPrice:{$sum: '$price'},
                movieCount:{$sum:1}
            } },
            {$sort:{minPrice:1}},
            //{$match : {maxPrice:{$gte:14.99}}}
        ]);

          res.status(200).json({
            status:"success",
            count: stats.length,
            data:{
                 stats}
        })
    })
exports.getMovieByGenre=asyncErrorHandler(async(req, res, next)=>{

        const genre = req.params.genre;
        const movie = await Movie.aggregate([
            {$unwind:'$genres'},
            {$group:{
                _id:'$genres',
                movieCount:{$sum:1},
                movies:{$push:'$name'},
               
            }},

             {$addFields: {genres:'$_id'}},
             {$project:{_id:0}},
             {$sort:{movieCount:-1}},
            // {$limit:6}
            {$match:{genres:genre}}
        ])
         res.status(200).json({
            status:"success",
            count: movie.length,
            data:{
                 movie}
        })
    })