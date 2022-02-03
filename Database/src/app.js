const express =require('express');
const app=express();
var cors = require('cors');


const PORT=process.env.PORT||5000;

const db=require('./db');

const Website=require('./Models/website');
const { model } = require('mongoose');


app.use(express.json());
app.use(cors({origin:"*",credentials:true}));

app.post('/addWebsite',(req,res)=>{
    const web=new Website(req.body);
    web.save().then(()=>{
        res.status(200).send("Successfull"); 
    }).catch((e)=>{
        res.status(400).send(e);
    });
})


app.get('/getWebsites',(req,res)=>{
    Website.find().then((results)=>{
        res.status(200).send(results); 
    }).catch((e)=>{
        res.status(400).send(e);
    });
})


app.put('/updateWebsite',(req,res)=>{
    const history=req.body.history;
    const _id=req.body._id;
    Website.updateOne({"_id" : _id},
    {$set: { "history" : history,"latestStatus":history[history.length-1].statusCode}}).then(result=>{
        res.status(200).send("Success");
    }).catch(err=>{
        res.status(401).send("Failure"+err);
    });
})



app.listen(PORT,()=>{
    console.log(`Server is connected at Port ${PORT}`);
})