const product = require('../product')
const OTPschema = require('../Otpschema')
const ResetSchema =require('../Resetpasswordschema')
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const otpgenerator = require("otp-generator");

const twilo = require("twilio");
const Otpschema = require('../Otpschema');

const accountSid = "AC29a5c3b6e5f872a8100f2e11f5e8f4c6"
const authToken = "e52cce3cba864379a9b071647b45356c"
const twilophonenumber = "+15005550006"
const expiryTimestamp = new Date();
const secretKey = 'your-secret-key';
expiryTimestamp.setMinutes(expiryTimestamp.getMinutes())
// const expiryTime = new Date(Date.now() + otpExpirySecond *1000)

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }else{
        // Extract the token from the 'Authorization' header
    const tokenBearer = token.split(' ');
    const tokenValue = tokenBearer[1];
    req.token =tokenValue;
  next()
    }
     
  
  }
//   app.get('/protected-route', authenticateToken, (req, res) => {
//     // The user is authorized, continue with the protected logic
//     res.json({ message: 'You are authorized to access this route' });
//   });

const ForgotPassword = async(req,resp)=>{
   const {email,newpassword,oldpassword} = req.body
//    const token= req.headers
   const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFiYWQxYzJmNDhjOTE5ZTM2MjRjM2IiLCJuYW1lIjoiQXphbSIsImVtYWlsIjoiYXphbWtoYW01MjUzQGdtYWlsLmNvbSIsInBob25lIjo4Njg2ODY4Njg2OCwiaWF0IjoxNjg4OTcyNzM0LCJleHAiOjE2ODg5NzYzMzR9.iV_w5gOD64qgSTbjto__tHe_MVg65fxPOqReWoHn7yM"

//    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

   try{
    let user = await product.findOne({email:email})
    let passwordMatch = await bcrypt.compare(oldpassword, user.password);
    const decoded = jwt.verify(token,"your-secret-key")
    if(user && passwordMatch) {
        const hashedPassword = await bcrypt.hash(newpassword, 12);
        await ResetSchema.findOneAndUpdate({email:email},{newpassword:hashedPassword,createdate:Date.now()},{upsert:true})
        await product.findOneAndUpdate({email:email},{password:hashedPassword,cpassword:hashedPassword})
        await user.save();
        resp.send({message:"Password Changed Successfully"})
    }else{
        resp.send({error:"Something Went Wrong"})
    }
//      if(alluser){
//       await ResetSchema.findOneAndUpdate({email:email},{newpassword:hashedPassword,createdate:Date.now()},{upsert:true})
//       const decoded = jwt.verify(token,"your-secret-key")
// if(decoded.email !== email){
//     resp.status(200).json({error:"Invalid user"})
//     return;
// } 
//       resp.json({message: decoded})
//     }else{
//         // resp.json({error:"Invalid Inputs"})
//         console.log(token)
//     }
   }catch(e){
    console.log(e)
   }
    }

const generateotp =  async (req,resp)=>{
 const {email} = req.body
 const {token} = req.headers
 const otp = otpgenerator.generate(4,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
 try{
  let alluser = await product.findOne({email:email})
  if(alluser){
    const otpExpirationTime = new Date(Date.now()+5*60000);
   await OTPschema.findOneAndUpdate(
    {email},
    {otp,otpexpireAt:otpExpirationTime},
    {upsert:true}
   )
   const token = jwt.sign({email,otpexpireAt:otpExpirationTime},'your-secret-key')
   resp.json({otp,token})
   sendMail({msg:otp})
 }else{
    resp.status(200).json({error:"Email not exist"})
 }
}catch(e){
    console.log(e)
 }
}

const Verifyotp = async(req,resp)=>{
 const {email,otp,token}=req.body
//  const{token}= req.headers
 try{
  const decoded = jwt.verify(token,"your-secret-key")
  const {email:decodedemail,otpexpireAt}= decoded
//   console.log(decodedemail)
  if(decodedemail !== email){
    resp.status(200).json({error:"Invalid username"})
    return;
  }
  if (new Date()>new Date(otpexpireAt)){
    resp.status(200).json({error:"OTP has expired"})
    return;
  }
  const user = await OTPschema.findOne({email});
  if(!user || user.otp !==otp){
    resp.status(200).json({error:"Invalid OTP"})
    return;
  }
  resp.json({message:"OTP Verification Successfull"})
 }catch(e){
    console.log(e,"Faild to verify otp")
    resp.status(401).json({error:"Failed to verify OTP"})
 }
}
const getApi =async(req,resp)=>{
    let data =await product.find();
        console.log(data)
        resp.send(data)
} 




const sendMail = async({req,resp,msg})=>{
    
    try{
        const transporter = nodemailer.createTransport({
            host:"smtp.ethereal.email",
            secure:false,
            port:587,
            auth: {
              user: 'dixie46@ethereal.email',
              pass: 'ZpK9vkJfQN2CCj5C23'
            }
          });
  

 const info = await transporter.sendMail({
    from:'"Fred Foo 👻" <dixie46@ethereal.email>', // sender address
    to:"sgupta@gedu.global", // list of receivers
    subject: "Verification otp from sanjay Bakery App Patna", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Hi Sanjay Your OTp is ${msg} </b>`, // html body
  });
 console.log("Message Sent",info.messageId);
//  resp.json(info)
    }catch(e){
       console.log(e,"Email not sent")
    }
}

const Loginapi = async(req,resp)=>{
   
    const {email, password, } = req.body;
    try {
      const user = await product.findOne({ email });
  
      if (!user) {
        resp.status(401).json({ error: 'Invalid email or password' });
        return;
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const payload = {
            userId:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone
            
          };
        const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
        resp.status(200).json({ message: 'Login successful',data:{email:user.email,id:user._id} ,token:token});
      } else {
        resp.status(200).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error finding user:', error);
      resp.status(500).json({ error: 'Internal server error' });
    }
    // if(email && password){
     
    //     let data = await product.findOne({email:email}).select(["-password","-cpassword","-phone","-__v"]);
       
    //     if(data){
    //     resp.send({isSuccess:true,data,message:"Login Successfull"})
    //     }else{
    //         resp.send({isSuccess:false,result:"No user Found"})
    //     }
    // }else{
    //     resp.send({isSuccess:false,result:"No user Found"})
    // }
          
}

const postApi = async(req,resp)=>{
    const {name,email,phone,password,cpassword} = req.body;
    if(!name || !email || !phone || !password || !cpassword){
        return resp.status(422).json({error:"Please fill all the fields"})
    }try{
        const userexist = await product.findOne({email:email});
    if(userexist) {
        return resp.status(422).json({error:"Email already Exist"})
    }else if(password != cpassword){
        return resp.status(422).json({error:"Password not matching"})
    }else{
        let data = new product(req.body);
        let result = await data.save();
        resp.status(201).json({message:"USer Created Successfully",response:{result}})
        resp.send(result)
        console.log(result)
    }
}catch(err){
 console.log(err)
}
}


const putApi = async(req,resp)=>{
    let data = await product.updateOne(req.params,{$set:req.body});  
  let A=  resp.status(200).json({message:`Data Update Successfully`})
    
    console.log(data)
    resp.send(A)
}

const deleteApi = async(req,resp)=>{
    let data = await product.deleteOne(req.params);
    console.log(data)
    resp.send(data)
}

const searchApi =async(req,resp)=>{
    let data = await product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {add:{$regex:req.params.key}},
                {lastname:{$regex:req.params.key}},
                {profession:{$regex:req.params.key}},
            ]
        }
    )
    console.log(data)
        resp.send(data)

}
module.exports ={getApi,postApi,putApi,deleteApi,searchApi,Loginapi,sendMail,ForgotPassword,generateotp,Verifyotp, authenticateToken}