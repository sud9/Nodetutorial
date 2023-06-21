// const http = require('http');
// const path =require('path')
// const fs = require('fs');
// const dirPath = path.join(__dirname,'files');
// const filePath =`${dirPath}/Hello2.txt`

// fs.rename(filePath,`${dirPath}/fruit.txt`,(err)=>{
//     if(!err)console.log('Rename Successfully')
// })
// fs.unlinkSync(`${dirPath}/Hello0.txt`)
// fs.appendFile(filePath, "and my father name is surendra",(err)=>{
//     if(!err) console.log('file updated')
// })

// fs.readFile(filePath,'utf-8',(err,item)=>{
//   if(!err)console.log(item)
// })
// for(i=0;i<5;i++)
// {
//  fs.writeFileSync(dirPath+"/Hello"+i+".txt" , "Hello myself Sudhir");
// }
// fs.readdir(dirPath,(err,files)=>{
//  files.map((item,index)=>(
//     console.log(item)
//  ))
// })
// console.log(dirPath)

// const data = require('./data')
// http.createServer((req,resp)=>{
//   resp.writeHead(200,{'Content-Type':'application\json'});
//   resp.write(JSON.stringify(data));
//   resp.end()
// }).listen(4500)

// const express = require('express')

// const app = express();

// app.get('',(req,res)=>{
//     console.log("data sent by browser",req.query.name)
//  res.send('Hello this home page'); 
// });

// app.get('/about',(req,res)=>{
//     res.send('Hello this About page');
//    });
// app.listen(5000)




// const getData = require("./mongodb")

// const main = async()=>{
//  let data = await getData();
//  data = await data.find().toArray();
//  console.warn(data)

// }

// main()


const mongoose =require('mongoose')
mongoose.connect("mongodb+srv://nativeapp09:Sudhir_1995@cluster0.qbj4qum.mongodb.net/Sudhir")
const ProductSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    add:String,
    profession:String
 })
const SaveInDB = async()=>{
 
 const Productsmodel = mongoose.model("Sudhir",ProductSchema,'Sudhir');
 let data = new Productsmodel({
    name:'Sangeet',
    lastname:'Som',
    add:'Modinagar',
    profession:'Sales'
});
 let result = await data.save();
 console.log(result)
}

const updateInDB =async() => {
    const Product = mongoose.model('Sudhir',ProductSchema,'Sudhir');
    let data =await  Product.updateMany(
        { name:"Sangeet" },
        {
            $set: { add:'Ghaziabad'}
        }
    )
    console.log(data)
    }

    const DeleteInDB = async()=>{
        const Product = mongoose.model('Sudhir',ProductSchema,'Sudhir');
        let data= await Product.deleteOne({name:'Akanksha'})
        console.log(data)
    }
   
    const FindInDB = async()=>{
        const Product = mongoose.model('Sudhir',ProductSchema,'Sudhir');
        let data= await Product.find({name:'Akanksha'})
        console.log(data)
    }
    FindInDB()




// const express = require('express');
// require('./config')

// const product = require('./product');

// const app = express();
//  app.use(express.json());
//  app.post("/create",async(req,resp)=>{
//     let data = new product(req.body);
//     let result = await data.save();
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