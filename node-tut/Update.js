const getData =require('./mongodb')

const Update = async()=>{
  let data = await getData();
  data = await data.updateMany({name:'Sudhir'},{$set:{profession:'Full Stack Developer'}})
  console.log(data)
}
Update()