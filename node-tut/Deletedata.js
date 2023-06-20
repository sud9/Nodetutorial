const getData = require('./mongodb')

const Delete = async()=>{
 let data = await getData();
 data = await data.deleteOne({item:'paper'})
 console.log(data)
}
Delete();