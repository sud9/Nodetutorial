// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')
// const ResetpasswordSchema =new mongoose.Schema({
//      email:{
//         type:String,
//         required:true,
//         unique:true
//      },
//      newpassword:{
//         type:String,
//         required:true,
// },
// resetpasswordate:{
//     type:Date,
//     required:true,
// }
    
// });

// ResetpasswordSchema.pre('save',async function (next){
//     if(this.isModified('newpassword')){
//        this.newpassword = await bcrypt.hash(this.newpassword,12)
  
//     }
//     next();
//   })
// module.exports = mongoose.model("Passwordchange",ResetpasswordSchema,"Passwordchange");


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
const ResetSchema = mongoose.Schema({
   
    email:String,
    newpassword:String,
    oldpassword:String,
    createdate:Date,
   
});

ResetSchema.pre('save',async function (next){
  if(this.isModified('newpassword')){
     this.newpassword = await bcrypt.hash(this.newpassword,12)
    //  this.cpassword = await bcrypt.hash(this.cpassword,12)
  }
  next();
})
module.exports= mongoose.model("Passwordchange",ResetSchema,"Passwordchange");