const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.get("/todos",(req,res)=>{

    const data = fs.readFileSync('data.json')

    res.send(JSON.parse(data))
})


app.post("/todo",bodyParser.urlencoded({extended:true}),(req,res)=>{
    
    const data = JSON.parse(fs.readFileSync('data.json'))

    const toSave = [...data,req.body]

    fs.writeFileSync('data.json',JSON.stringify(toSave))

    res.send({status:"ok"})
})


app.get('/todo/:id/remove',(req,res)=>{
    
    const data = JSON.parse(fs.readFileSync('data.json'))
    data.splice(req.params.id,1)
    fs.writeFileSync('data.json',JSON.stringify(data))

    res.send({status:"ok"})
})

app.get('/todo/:id/markdone',(req,res)=>{
    
    const data = JSON.parse(fs.readFileSync('data.json'))
    data[req.params.id].completed = !data[req.params.id].completed;
    fs.writeFileSync('data.json',JSON.stringify(data))

    res.send({status:"ok"})
})


app.listen(5000)