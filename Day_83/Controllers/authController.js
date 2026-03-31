const User = require('../Models/userModel')
const asyncErrorHandler = require('../Utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const CustomError = require('../Utils/CustomError')
const util = require ('util')

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




exports.protect = asyncErrorHandler(async(req, res, next)=>{
//1. Read the token and check if it exist
const testToken = req.headers.authorization
let token;
if (testToken && testToken.startsWith('Bearer')){
    token = testToken.split(' ')[1];

}
if (!token){
    return next(new CustomError('You are not logged in', 401))
}


//2 validate the token
const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR)
console.log(decodedToken)
//3. if the user exist
const user = await User.findById(decodedToken.id)
if(!user){
    return next(new CustomError('The user with the given token does not exist', 401))
}

const isPasswordChanged =await user.isPasswordChanged(decodedToken.iat)
//4. if the user change the password after the token was issued
if(isPasswordChanged){
    return next(new CustomError('The password has been changed recently', 401))
};

req.user = user;
next();
})