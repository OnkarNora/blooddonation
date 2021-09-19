const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/donors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
mongoose.connect('mongodb+srv://avenger:r0WOixwsbdnADuWm@cluster0.6kf2q.mongodb.net/blooddonation?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.post('/donor',jsonParser,function(req,res){
    console.log("Got request : ");
    const data = new User({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        blood:req.body.blood,
        pincode:req.body.pincode
    })
    data.save().then((result)=>{
        res.status(201).json(result);
    }).catch((err)=>{console.warn(err)});
})

app.get("/search/:blood",function(req,res){
    
    if(req.params.blood === 'AB+' || req.params.blood === 'ab+'){
        User.find({$or:[{blood:'AB+'},{blood:'AB-'},{blood:'A+'},{blood:'A-'},{blood:'B+'},{blood:'B-'},{blood:'O+'},{blood:'O-'}]}).then((result)=>{
        res.status(200).json(result);
        })
    }
    else if(req.params.blood === 'A+' || req.params.blood === 'a+'){
        User.find({$or:[{blood:'A+'},{blood:'A-'},{blood:'O+'},{blood:'O-'}]}).then((result)=>{
        res.status(200).json(result);
        })
    }
    else if(req.params.blood === 'B+' || req.params.blood === 'b+'){
        User.find({$or:[{blood:'B+'},{blood:'B-'},{blood:'O+'},{blood:'O-'}]}).then((result)=>{
        res.status(200).json(result);
        })
    }
    else if(req.params.blood === 'O+' || req.params.blood === 'o+'){
        User.find({$or:[{blood:'O+'},{blood:'O-'}]}).then((result)=>{
        res.status(200).json(result);
        })
    }
    else if(req.params.blood === 'A-' || req.params.blood === 'a-'){
        User.find({$or:[{blood:'A-'},{blood:'O-'}]}).then((result)=>{
        res.status(200).json(result);
        })
    }
    else if(req.params.blood === 'O-' || req.params.blood === 'o-'){
        User.find({$or:[{blood:'O-'}]}).then((result)=>{
        res.status(200).json(result);
        })
    }
    else if(req.params.blood === 'B-' || req.params.blood === 'b-'){
        User.find({$or:[{blood:'B-'},{blood:'O-'}]}).then((result)=>{
        res.status(200).json(result);
        })
    }
    else if(req.params.blood === 'AB-' || req.params.blood === 'ab-'){
        User.find({$or:[{blood:'AB-'},{blood:'A-'},{blood:'B-'},{blood:'O-'}]}).then((result)=>{
            res.status(200).json(result);
        })
    }else{
        res.status(404).json({"error":"invalid request"});
    }

})

app.listen(4000);