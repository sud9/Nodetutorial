const product = require('../product')

const getApi =async(req,resp)=>{
    let data =await product.find();
        console.log(data)
        resp.send(data)
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
module.exports ={getApi,postApi,putApi,deleteApi,searchApi}