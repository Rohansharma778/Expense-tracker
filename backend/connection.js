const mongoose=require('mongoose')
const dotnev=require('dotenv')
dotnev.config()

const URI=process.env.MONGO_URI

const dbconnection=mongoose.connect(URI)
.then(()=>{
    console.log(`database connected successfully`)
})
.catch((error)=>{
    console.error("ERROR:",error)
})

module.exports=dbconnection