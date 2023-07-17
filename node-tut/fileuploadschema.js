const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UploadSchema = mongoose.Schema({
   
    originalName: String,
        mimeType: String,
        data: Buffer,

   
});

// UploadSchema.pre('save',async function (next){
//   if(this.isModified('newpassword')){
//      this.newpassword = await bcrypt.hash(this.newpassword,12)
//     //  this.cpassword = await bcrypt.hash(this.cpassword,12)
//   }
//   next();
// })
module.exports= mongoose.model("Filesupload",UploadSchema,"Filesupload");