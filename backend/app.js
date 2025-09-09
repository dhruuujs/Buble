import express from 'express';
import cors from 'cors';
import '../backend/server.js';

const app= express();
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Connected to the server");
});

module.exports=app;