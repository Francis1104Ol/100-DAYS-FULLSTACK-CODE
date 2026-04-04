const User = require('../Models/userModel')
const asyncErrorHandler = require('../Utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const CustomError = require('../Utils/CustomError')
const util = require ('util')
const sendMail = require('../Utils/email')
const crypto = require('crypto')

const signToken = id=>{
   return jwt.sign({id}, process.env.SECRET_STR,{
    expiresIn:process.env.LOGIN_EXPIRES
   })
}

const createSendResponse = (user, statusCode, res)=>{
    const token =  signToken(user._id)
    res.status(statusCode).json({
    status: 'success',
    token,
    data:{
        user
    }
   });
}
 
exports.signup= asyncErrorHandler(async (req, res, next)=>{
   const newUser = await User.create(req.body);
   createSendResponse(newUser, 201, res)
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

//check if user exist and the password matches 
if (!user|| !(await user.comparePasswordInDb(password))){
    const error = new CustomError('Incorrect email or password', 400)
    return next(error)
}
createSendResponse(user, 200, res)

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
//A WRAPPER FUNCTION
exports.restrict = (role)=>{
    return(req, res, next)=>{
        if(req.user.role !== role){
            return next(new CustomError('You do not have permission to perform this action', 403))
        }
        next();
    }
}

// // WHEN THERE'S MORE THAN 1 ROLES to perform an action 
// exports.restrict = (...role)=>{
//     return(req, res, next)=>{
//         if(!role.includes(req.user.role)){
//             return next(new CustomError('You do not have permission to perform this action', 403))
//         }
//         next();
//     }
// }

exports.forgotPassword =  asyncErrorHandler(async(req, res, next) =>{
    //1 get user based on the post email
    const user = await User.findOne({email:req.body.email})

    if(!user){
    return next(new CustomError('we could not find the user with given email', 404))
    }

    //2 generate random reset token
    const resetToken= user.createResetPasswordToken();
    await user.save({validateBeforeSave:false});

    //SEND THE TOKEN BACK TO THE USER EMAIL
    const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message =`we have recieve a password reset request. please use the below link to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid only for 10 minutes.`;
try{
   await sendMail({
    email:user.email,
    subject: 'password change request recieved',
    message:message
   });
   res.status(200).json({
    status: 'success',
    message:'password reset link send to the user email'
   })
}catch(err){
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires =undefined
   await user.save({validateBeforeSave:false});

    return next(new CustomError('there was an error sending password reset email. please try again later', 500))
}
})

exports.resetPassword =asyncErrorHandler(async (req, res,next)=>{
   //CHECKING IF THE USER EXIST WITH THE GIVE TOKEN& TOKEN HAS NOT EXPIRED
    const token =crypto.createHash('sha256').update(req.params.token).digest('hex')
 const user =  await User.findOne({passwordResetToken:token, passwordResetTokenExpires:{$gt:Date.now()}})
 if(!user){
    return next(new CustomError('Token is invalid or has expired.',400))
 }

 //RESETTING THE USER PASSWORD
 user.password = req.body.password;
 user.confirmPassword= req.body.confirmPassword
 user.passwordResetToken = undefined
 user.passwordResetTokenExpires = undefined
 user.passwordChangedAt = Date.now()

 await user.save();

 //LOGIN THE USER
 createSendResponse(user, 200, res)
})

exports.updatePassword = asyncErrorHandler(async(req, res, next)=>{
    //GET CURRENT USER DATA FROM THE DATABASE
    const user = await User.findById(req.user._id).select('+password')
    //CHECK THE CURRENT PASSWORD IF IT IS CORRECT 
    if(!(await user.comparePasswordInDb(req.body.currentPassword, user.password))){
        return next(new CustomError('The current password you provide is wrong', 401))
    }
    //IF THE SUPPLIED PASSWORD IS CORRECT THEN UPDATE THE PASSWORD 
    user.password = req.body.password;
    user.confirmPassword =req.body.confirmPassword;

     await user.save();
    //LOGIN  THE USER AND SEND JSON WEB TOKEN IN THE RESPONSE
    createSendResponse(user, 200, res)
})