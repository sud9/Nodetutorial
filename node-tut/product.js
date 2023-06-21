// const mongoose = require('mongoose')
// const ProductSchema = mongoose.Schema({
//     name:String,
//     lastname:String,
//     add:String,
//     profession:String
// })
// module.exports = mongoose.model("Sudhir",ProductSchema,"Sudhir")

const mongoose = require('mongoose');
const productSchema= mongoose.Schema({
    name:String,
    lastname:String,
    add:String,
    profession:String
});

module.exports= mongoose.model("Sudhir",productSchema,"Sudhir");