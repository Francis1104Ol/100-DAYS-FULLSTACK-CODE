const User = require('../Models/userModel')
const asyncErrorHandler = require('../Utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const CustomError = require('../Utils/CustomError')
const util = require ('util')
const sendMail = require('../Utils/email')
const crypto = require('crypto')
const createSendResponse = require('../Utils/createSendResponse');

const filterReqObj = (obj, ...allowedFields)=>{
    const newObj = {};
    Object.keys(obj).forEach(prop =>{
        if (allowedFields.includes(prop))
            newObj[prop] = obj[prop]
    })
    return newObj;
}


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

exports.updateMe = asyncErrorHandler(async(req, res, next)=>{
    if(req.body.password|| req.body.confirmPassword){
        return next(new CustomError('you can not update your password using this endpoint', 400))
    }

    //UPDATE THE USER
    const filterObj = filterReqObj(req.body, 'name', 'email')
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filterObj,{runValidators:true, new:true})
    createSendResponse(updatedUser, 200, res)
    
})