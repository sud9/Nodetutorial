const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://nativeapp09:Sudhir_1995@cluster0.qbj4qum.mongodb.net/'
const database = 'Sudhir'
const client = new MongoClient(url);

const getData = async()=>{
    let result = await client.connect();
    let db = result.db(database);
    return db.collection('Sudhir')
 
   }
   module.exports = getData;