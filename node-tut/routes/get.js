const express = require('express');
const product = require('../product');
const app = express();
require('../config')
app.use(express.json());

app.route("/lists").get(async(req,resp)=>{
    let data =await product.find();
        console.log(data)
        resp.send(data)
        
    // let data = new product(req.body);
    // let result = await data.save();
    // resp.status(200).json({message:"Post Created Successfully",response:{result}})
    // resp.send(result)
    // console.log('dd');

});


app.route("/create").post(async(req,resp)=>{
    let data = new product(req.body);
    let result = await data.save();
    resp.status(200).json({message:"Created Successfully",response:{result}})
    resp.send(result)
    console.log(result)
})

app.route("/delete/:_id").delete(async(req,resp)=>{
    let data = await product.deleteOne(req.params);
    console.log(data)
    resp.send(data)
})

app.route("/update/:_id").put(async(req,resp)=>{
    let data = await product.updateOne(req.params,{$set:req.body});  
  let A=  resp.status(200).json({message:"Data Update Successfully"})
    // resp.status(200).json({message:"Detail updated Successfully"})
    console.log(data)
    resp.send(A)
})

app.route("/search/key").get(async(req,resp)=>{
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

})
module.exports = app;


