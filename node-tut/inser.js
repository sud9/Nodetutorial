const getData = require('./mongodb')

const Insert = async()=>{
  let data = await getData();
  data = await data.insertMany([
    {name:'Sudhir',lastname:'Gupta',add:'Modinagar',profession:'Developer'},
    {name:'Sudhir',lastname:'Gupta',add:'Modinagar',profession:'Developer'},
    {name:'Sudhir',lastname:'Gupta',add:'Modinagar',profession:'Developer'}

  ]);
//   data = await data.find().toArray()
  console.log(data)
}
Insert();