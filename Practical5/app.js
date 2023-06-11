const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const mongoDB = require('./dbConn');
let port = 2000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    fs.readFile("public/html/index.html",(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/addDetails',(req,res)=>{
    fs.readFile("public/html/add.html",(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/updateDetails',(req,res)=>{
    fs.readFile("public/html/update.html",(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/readDetails',(req,res)=>{
    fs.readFile("public/html/read.html",(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/deleteDetails',(req,res)=>{
    fs.readFile("public/html/delete.html",(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(data);
        res.end();
    });
});

app.post('/add',async (req,res)=>{
    let database = await mongoDB.getDatabase();
    const collection = database.collection('Student_Details');
    let data = req.body;
    let book = { Name : data.UName,Email_ID : data.Email ,Roll_No: data.Roll,Contact : data.Contact};
    await collection.insertOne(book);
    console.log("Data Inserted !");
    return res.redirect('/');
});

app.post('/update',async (req,res)=>{
    let database = await mongoDB.getDatabase();
    const collection = database.collection('Student_Details');
    let data = req.body;
    let result = await collection.updateOne({Name : data.UName},{$set:{Email_ID : data.Email ,Roll_No: data.Roll,Contact : data.Contact}});
    console.log("Data Updated !");
    return res.redirect('/');
});

app.post('/read',async (req,res)=>{
    let database = await mongoDB.getDatabase();
    const collection = database.collection('Student_Details');
    let result = await collection.findOne({Name : req.body.UName});
    await console.log(result);
    return res.redirect('/');
});

app.post('/delete',async (req,res)=>{
    let database = await mongoDB.getDatabase();
    const collection = database.collection('Student_Details');
    let result = await collection.deleteOne({Name : req.body.UName});
    console.log("Deleted Was Data !");
    await console.log(result);
    return res.redirect('/');
});
app.listen(port);
console.log(`Click Here : http://localhost:${port}`);
