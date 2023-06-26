// const mongoose = require('mongoose')
// const ProductSchema = mongoose.Schema({
//     name:String,
//     lastname:String,
//     add:String,
//     profession:String
// })
// module.exports = mongoose.model("Sudhir",ProductSchema,"Sudhir")

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const productSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    cpassword:String,
   
});

productSchema.pre('save',async function (next){
  if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password,12)
     this.cpassword = await bcrypt.hash(this.cpassword,12)
  }
  next();
})
module.exports= mongoose.model("signup",productSchema,"signup");