const express = require('express');
const getData = require('./mongodb');
const mongodb =require('mongodb')
const app = express();

app.use(express.json());

app.get('/',async(req,resp)=>{
 let data =await getData();
  data = await data.find().toArray()
 console.log(data)
 resp.send(data)
});


app.post('/',async(req,resp)=>{
    let data= await getData();
    let result =await data.insertMany(req.body)
    console.log(result)
    resp.send(result)
})


app.put('/:name',async(req,resp)=>{
  let data = await getData();
   let result = await data.updateMany({name:req.params.qty},{$set:req.body})
   console.log(result)
   resp.send(result)
})

app.delete('/:id',async(req,resp)=>{
 let data = await getData();
 let result = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
 console.log(result)
 resp.send(result)
})

app.listen(5000) 
