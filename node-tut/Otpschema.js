const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const OtpSchema =new mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },
     otp:{
        type:String,
        required:true,
},
     otpexpireAt:{
        type:Date,
        required:true
     }
});

// Otpschema.pre('save',async function (next){
//  next()
// })
module.exports = mongoose.model("otp",OtpSchema,"otp");