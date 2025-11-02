const express=require('express')
const dbconnection=require('./connection.js')
const Transaction=require('./model/transactionModel.js')
const dotenv=require('dotenv')
const cors=require('cors')
const { error } = require('console')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

app.get('/api',async(req,res)=>{
    const {type,category}=req.query;
    try {
        const query={}
        if (type) query.type = type
        if (category) query.category = category        
        console.log('Search query:', query)
        const transaction = await Transaction.find(query)  
        console.log('Found transactions:', transaction)
        
        res.status(200).json({transaction})
    } catch (error) {
    console.error("ERROR:",error)
    res.status(500).json({message:'something went wrong'})
} 
})

app.post('/api',async(req,res)=>{
    const {type,amount,category,description,date}=req.body;
try {
    const newtransaction=await Transaction.create({
        type:type,
        amount:amount,
        category:category,
        description:description,
        date:date 
    })
    if(!newtransaction){
        return res.status(400).json({message:'All feild required'})
    }
    console.log(newtransaction)
res.status(201).json(newtransaction)
} catch (error) {
    console.error("ERROR:",error)
    res.status(500).json({message:'something went wrong'})
} 
})

app.put('/api/:id',async(req,res)=>{
    const{id}=req.params
    const { type,amount,description,category,date}=req.body;
    try {
        const updatetransaction=await Transaction.findByIdAndUpdate(id,{
            type:type,
            amount:amount,
            description:description,
            category:category,
            date:date
        },{new:true})
        if(!updatetransaction){
            return res.status(404).json({message:"Not found!"})
        }
        res.status(200).json(updatetransaction)
    } catch (error) {
        console.error("ERROR:",error)
        res.status(500).json({message:'something went wrong'})
    }    
})

app.delete("/api/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const deletetransaction=await Transaction.findByIdAndDelete(id)
        if(!deletetransaction){
            return res.status(404).json({message:"Not found"})
        }
        res.status(200).json({message:"transaction is delete",deletetransaction})
    } catch (error) {
      console.error("ERROR:",error)  
      res.status(500).json({message:"something went wrong"})
    }
})
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
