const mongoose=require('mongoose')
const express=require('express')

var Model
function getModel(Collection_Name,Schema){
    const _schema=new mongoose.Schema(Schema)
    const _Model=new mongoose.model(Collection_Name,_schema)
    return _Model
}
 
async  function getConnected(Database_url){
   let result=await mongoose.connect(Database_url)
   console.log(result.STATES.connecting)
}

async function AddData(_data){
    let data=new Model(_data)
    
    let result=await data.save()
    return result;
}


async function DeleteData(_data){
    let result=await Model.deleteOne(_data)
    return result;
}

async function getData(){
    let result=await Model.find({})
    return result;
}
async function updateData(_prev,_new){
    let result=await Model.updateOne(_prev,{$set:_new})
    return result;
}


async function main(){
   await getConnected('mongodb+srv://admin123:admin123@checkdb.xdmf8oz.mongodb.net/?retryWrites=true&w=majority')
    Model=getModel("students",{name:String,roll:Number,semester:String})
}



 main()



const app=express()
app.use(express.json())





app.get('/',async (req,res)=>{
    
    //  let response=await  Model.find()
console.log("D-----------------------------------------------------------------------------------------------")
console.log("D-----------------------------------------------------------------------------------------------")
console.log("D-----------------------------------------------------------------------------------------------")


    const db = mongoose.connection;

// Event handlers for the database connection
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Check if Mongoose is connected
if (mongoose.connection.readyState === 1) {
  console.log('Mongoose is connected to MongoDB');
} else {
  console.log('Mongoose is not connected to MongoDB');
}
    res.send("response")
    console.log("D-----------------------------------------------------------------------------------------------")
    console.log("D-----------------------------------------------------------------------------------------------")
    console.log("D-----------------------------------------------------------------------------------------------")
    
})

app.post('/add',async (req,res)=>{
    let data=req.body
    let response=await AddData(data)

    res.send(response)
})

app.put('/update',async(req,res)=>{
    
    let data=req.body
    let previous=data.previous;
    let _new =data._new
    let response=await updateData(previous,_new);
    res.send(response)

   
})
app.delete('/delete',async(req,res)=>{
   let data=req.body
    let response=await DeleteData(data)

    res.send(response)
})


app.get("/search/:key/:key1",async (req,resp)=>{
    let check=req.params.key
    let check2=parseInt(req.params.key1)
    console.log(typeof check)
    console.log(typeof check2)

    let data=await getData({
    "$or":[
        {"name":{$regex:check}},
        {"roll":{$regex:check}}
       
    ]
})
    
 resp.send(data)
})

app.get("/message",(req,resp)=>{
  resp.setHeader("Link",{'Content-Type':'text/html'})
resp.send("https://weak-red-gopher-shoe.cyclic.app ")
})

app.listen(process.env.Port || 6000)

