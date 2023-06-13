const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const mysql= require('mysql2');
let port = 2000;

const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'student',
    database : 'details'
});


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
app.post('/add',(req,res)=>{
    let uname = req.body;
    let sql = 'INSERT INTO customer SET ?';
    con.query(sql,uname,(err,data)=>{
        if(err) throw err;
        console.log("Record Inserted !");
    });
    res.redirect('/');
});


app.post('/read',(req,res)=>{
    let uname = req.body;
    let sql = 'SELECT * FROM customer WHERE ?';
    con.query(sql,uname,(err,data,fields)=>{
        if(err) throw err;
        console.log(data);
    });
    res.redirect('/');
});

app.post('/update',(req,res)=>{
    let uname = req.body.UName;
    let value = req.body;
    let sql = 'UPDATE customer SET ? WHERE UName = ?';
    con.query(sql,[value,uname],(err,data)=>{
        if(err) throw err;
        console.log(data.affectedRows + 'Records Updated !');
    });
    res.redirect('/');
});

app.post('/delete',(req,res)=>{
    let uname = req.body.UName;
    let sql = 'DELETE FROM customer WHERE UNAME = ?';
    con.query(sql,uname,(err,data)=>{
        if(err) throw err;
        console.log(data.affectedRows + ' Records Deleted !');
    });
    res.redirect('/');
});
app.listen(port);
console.log(`Click Here : http://localhost:${port}`);
