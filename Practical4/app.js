var host = "http://localhost:";
var port = 8080;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.set('view engine','hbs');
app.set('views','D:/Practical-4/views');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res) =>{
    fs.readFile('index.html',(err,data)=>{
        res.write(data);
        return res.end();
    });
});

app.post('/sample',(req,res) =>{
    fs.writeFile('info.json',JSON.stringify(req.body),(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/File');
        }
    });
});
app.get("/File",(req,res)=>{
    var a = fs.readFileSync('info.json');
    var b = JSON.parse(a);
    console.log(b);
    res.render('handle',{data:b});
});
app.listen(port);
console.log(`${host}${port}`);
