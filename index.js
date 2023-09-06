const express=require('express')
const app=express()
const Port=process.env.Port || 7000

app.get("/", (req,resp)=>{
   console.log('Request Ip Address ',req.ip)
    
 resp.send("Request to Server from ip "+req.ip)
})

app.listen(Port)
console.log("Listing at port "+Port)