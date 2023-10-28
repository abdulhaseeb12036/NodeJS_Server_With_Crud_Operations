const express=require('express')
const mongoose=require('mongoose')
const mongodb=require('mongodb')
const cors=require('cors')
const Model=require("./Model")
require('dotenv').config()
const app=express()
app.use(cors({
    origin:'http://localhost:3001',
    methods:["GET","POST" ]
}))

app.use(express.json())


const database=null
async function getconnected(databaseUrl){
      let result= mongoose.connect(databaseUrl)
      result.then(()=>{
        console.log("Database connected")
        main()
      })
      .catch(err=>{
        console.log("Something went wrong : "+err)
      })


}


function main(){
    app.listen(process.env.PORT,()=>{
        console.log("listening at port "+5000)
    })

    
}

async function insertData(data){
 
}

app.post('/save',async(req,res)=>{
    let data=req.body;
    let model=new Model(data)
    let result=await model.save()
    res.send(result)
})

app.get('/get_data',async(req,res)=>{
   
    let result=await Model.find({})
    console.log(result)
    res.send(result)
})

getconnected(process.env.URL)