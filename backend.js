const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/donors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
require('dotenv').config();
var path = require('path')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6kf2q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.post('/donor', jsonParser, function (req, res) {
    console.log("Got request : ", req.body);
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        blood: req.body.blood,
        pincode: req.body.pincode,
        loc: [req.body.loc[0], req.body.loc[1]]
    })
    data.save().then((result) => {
        res.status(201).json(result);
    }).catch((err) => { console.warn(err) });
})

app.get("/search/:blood/:pincode", function (req, res) {

    if (req.params.blood === 'AB+' || req.params.blood === 'ab+') {
        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or": [{ blood: 'AB+' }, { blood: 'AB-' },{ blood: 'A+' }, { blood: 'A-' },{ blood: 'B+' }, { blood: 'B-' },{ blood: 'O+' }, { blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    }
    else if (req.params.blood === 'A+' || req.params.blood === 'a+') {
        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or": [{ blood: 'A+' }, { blood: 'A-' }, { blood: 'O+' }, { blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    }
    else if (req.params.blood === 'B+' || req.params.blood === 'b+') {
        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or": [{ blood: 'B+' }, { blood: 'B-' }, { blood: 'O+' }, { blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    }
    else if (req.params.blood === 'O+' || req.params.blood === 'o+') {
        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or": [{ blood: 'O+' }, { blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    }
    else if (req.params.blood === 'A-' || req.params.blood === 'a-') {
        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or":[{ blood: 'A-' }, { blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    }
    else if (req.params.blood === 'O-' || req.params.blood === 'o-') {
        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or":[{ blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    }
    else if (req.params.blood === 'B-' || req.params.blood === 'b-') {
        
        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or":[{ blood: 'B-' }, { blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    }
    else if (req.params.blood === 'AB-' || req.params.blood === 'ab-') {

        User.findOne({ "pincode": req.params.pincode }).then((zipLoc)=>{
            User.find({
                "loc": {
                    "$near": zipLoc.loc,"$maxDistance": 10
                },
                "$or":[{ blood: 'AB-' }, { blood: 'A-' }, { blood: 'B-' }, { blood: 'O-' }]
            }).then((result)=>{
                res.status(200).json(result);
            })
        })
    } else {
        res.status(404).json({ "error": "invalid request" });
    }

})

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
  });

app.listen(process.env.PORT);
console.log(`app listening on port ${process.env.PORT} ...`);