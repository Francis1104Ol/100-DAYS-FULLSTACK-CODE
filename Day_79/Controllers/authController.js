const User = require('../Models/userModel')
const asyncErrorHandler = require('../Utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const CustomError = require('../Utils/CustomError')

const signToken = id=>{
   return jwt.sign({id}, process.env.SECRET_STR,{
    expiresIn:process.env.LOGIN_EXPIRES
   })
}

exports.signup= asyncErrorHandler(async (req, res, next)=>{
   const newUser = await User.create(req.body);
   
   const token =  signToken(newUser._id)
   res.status(201).json({
    status: 'success',
    token,
    data:{
        user: newUser
    }
   });
})
//Check if email and password is present in the request body
exports.login = asyncErrorHandler(async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password
    //or using object destructuring syntax
    // const{email,password} =req.body
    if(!email || !password){
    return next(new CustomError('Please provide email & password', 400));
}
//check if the user exist with the given email
const user = await User.findOne({email:email}).select('+password');
//const isMatch =await comparePasswordInDb(password,user.password)

//check uf user exist and the password matches 
if (!user|| !(await user.comparePasswordInDb(password))){
    const error = new CustomError('Incorrect email or password', 400)
    return next(error)
}

const token =  signToken(user._id)
    res.status(200).json({
        status: 'success',
        token
      //  user: i don't want to return the user details
    })
})