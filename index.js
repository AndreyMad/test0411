const http = require("http");
const  fs = require('fs');
const  url = require("url");
const path = require("path")
const express = require("express");

const app = express();


const httpServer = http.createServer(app)
app.use(express.static(path.join(__dirname)))

app.get('/id*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'detailpage.html'))
})
app.get('*',(req, res)=>{
     res.sendFile(path.join(__dirname, 'index.html'))
})
httpServer.listen(80, () => {
    console.log(`Example  at:${80}`);
  });
