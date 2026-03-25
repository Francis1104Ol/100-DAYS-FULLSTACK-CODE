const mongoose = require('mongoose')
const validator = require('validator')
const { validate } = require('./movieModel')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please Enter your name']
    },
    email:{
        type: String,
        require: [true,'Please Enter your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, 'Please Enter a valid email']
    },
    photo:String,
    password:{
        type: String,
        require:[true, ' Please Enter a password'],
        minLength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        require:[true, 'Please confirm your pass word'],
        //this validator will only work for save() and create()
        validate:{
            validator: function(val){
                return val ===this.password
            },
            message: 'Password & confirm Password does not match'
        }
    }
})


userSchema.pre('save', async function(next){
    //this check is the password has not been modified
    if(!this.isModified('password')) return ;

    // if it has not been modified then we encrypt async we also have sync version of it
   this.password =  bcrypt.hash(this.password, 12)

   this.confirmPassword = undefined
   
})

userSchema.methods.comparePasswordInDb = async function(pswd){
    return await bcrypt.compare(pswd, this.password)
}
const User = mongoose.model('User', userSchema);
module.exports = User