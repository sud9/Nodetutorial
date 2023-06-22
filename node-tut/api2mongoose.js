



// const express = require('express');
// require('./config')

// const product = require('./product');

// const app = express();
//  app.use(express.json());
//  app.post("/create",async(req,resp)=>{
//     let data = new product(req.body);
//     let result = await data.save();
//     // resp.status(200).json({message:"Post Created Successfully"})
//     resp.send(result)
//     console.log(result);
// });

// app.get('/lists',async(req,resp)=>{
//     let data =await product.find();
//     console.log(data)
//     resp.send(data)
// })

// app.delete("/delete/:_id",async(req,resp)=>{
//   let data =await product.deleteOne(req.params);
//     console.log(data)
//     resp.send(data)
// })

// app.put("/update/:_id",async(req,resp)=>{
//    let data = await product.updateOne(
//     req.params,
//     {
//         $set:req.body
//     }
//     );
//    console.log(data)
//    resp.send(data);
// })


// app.get("/search/:key",async(req,resp)=>{
//     console.log(req.params.key)
//     let data = await product.find(
//         {
//             "$or":[
//                 {name:{$regex:req.params.key}},
//                 {add:{$regex:req.params.key}},
//                 {lastname:{$regex:req.params.key}},
//                 {profession:{$regex:req.params.key}},
//             ]
//         }
//     )
//     console.log(data)
//     resp.send(data)
// })
// app.listen(5000);