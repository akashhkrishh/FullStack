const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Docker is Running ... ");
});
console.log("Server Started");
app.listen(8000);