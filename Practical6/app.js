const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();

const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'student',
    database : 'details'
});

con.connect((err)=>{
    if(err) throw err;
    console.log("Database Connected !")
});
app.use(bodyparser.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    fs.readFile("index.html",(err,data)=>{
        res.write(data);
        return res.end();
    });
});
app.get("/create",(req,res)=>{
    fs.readFile("create.html",(err,data)=>{
        res.write(data);
        return res.end();
    });
});
app.get("/update",(req,res)=>{
    fs.readFile("update.html",(err,data)=>{
        res.write(data);
        return res.end();
    });
});
app.get("/delete",(req,res)=>{
    fs.readFile("delete.html",(err,data)=>{
        res.write(data);
        return res.end();
    });
});
app.get("/read",(req,res)=>{
    fs.readFile("read.html",(err,data)=>{
        res.write(data);
        return res.end();
    });
});
app.post('/submit',(req,res)=>{
    let uname = req.body;
    let sql = 'INSERT INTO customer SET ?';
    con.query(sql,uname,(err,data)=>{
        if(err) throw err;
        console.log("Record Inserted !");
    });
    res.redirect('/');
});
app.post('/readFile',(req,res)=>{
    let uname = req.body;
    let sql = 'SELECT * FROM customer WHERE ?';
    con.query(sql,uname,(err,data,fields)=>{
        if(err) throw err;
        console.log(data);
    });
    res.redirect('/');
});

app.post('/updateFile',(req,res)=>{
    let uname = req.body.username;
    let value = req.body;
    let sql = 'UPDATE customer SET ? WHERE USERNAME = ?';
    con.query(sql,[value,uname],(err,data)=>{
        if(err) throw err;
        console.log(data.affectedRows + 'Records Updated !');
    });
    res.redirect('/');
});
app.post('/deleteFile',(req,res)=>{
    let uname = req.body.username;
    let sql = 'DELETE FROM customer WHERE USERNAME = ?';
    con.query(sql,uname,(err,data)=>{
        if(err) throw err;
        console.log(data.affectedRows + ' Records Deleted !');
    });
    res.redirect('/');
});
app.listen(8000);