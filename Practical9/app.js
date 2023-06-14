const express=require("express");
const expressSession=require("express-session");
const mongosession=require('connect-mongodb-session')(expressSession);
const hbs=require("hbs");
const bodyparser=require("body-parser");
const DB = require("./dbConn")
const app = express();


app.use(express.static(__dirname+'/public'));
app.use(bodyparser.urlencoded({extended:true}));
app.set('views', './public/views');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
const url="mongodb://localhost:27017/fullstack";

const store=new mongosession({
    uri:url, collection:"store", 
});
app.use(expressSession({
    secret:"a secret value",
    resave:false,
    saveUninitialized:false,
    store:store,
}));

const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else{
        return res.redirect('/login');
    }
};

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.get("/dashboard",isAuth,async(req,res)=>{
    res.render("dashboard");
});


app.post('/signup',async (req,res)=>{
    let database = await DB.getDatabase();
    const collection = database.collection('store');
    let data = req.body;
   
    var users = await collection.findOne({email:data.email});
    if(users){
        return res.redirect("/signup");
    }
    else{
        collection.insertOne(
            {username:data.name, email:data.email, password:data.pass},
            (err,result)=>{
                if (err) throw err;
                console.log(result)
            }
        )
    }
    return res.redirect("/login");
});

app.post('/login',async (req,res)=>{
    let database = await DB.getDatabase();
    const collection = database.collection('store');
    let data = req.body;
   
    var users = await collection.findOne({email:data.email});
    if(!users){
        return res.redirect("/login");
    }
    else if(users.password==data.pass){
        req.session.isAuth=true;
        return res.redirect("/dashboard");
    }
    return res.redirect("/login");
});



app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        res.redirect("/");
    } 
)});
app.listen(8088);