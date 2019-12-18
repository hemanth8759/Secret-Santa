const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;


app.use(cors());
app.use(bodyParser.json());


function authenticate(req, res, next) {
    res.status(401).json({
        message: "not authenticated"
    })
}


app.get('/', function (req, res) {
    res.send("<h1>Hello World from Node JS!!!</h1>")
})
app.get('/home', function (req, res) {
    res.send("<h1>Home from Node JS!!!</h1>")
})
app.get('/client-side', function (req, res) {
    res.json({
        "message": "Work Done"
    })
})



app.post('/register', function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db("GDB");

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {

                req.body.password = hash;
                db.collection("gamers").insertOne(req.body, function (err, data) {
                    if (err) throw err;
                    console.log(data);
                    res.json({ "message": "Successfully Registered" })
                })
                client.close();
            })
            console.log(req.body);
        })
    })
});

app.post('/gamersData', authenticate, function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db("GDB");

        var userCursor = db.collection("gamers").find().toArray();
        userCursor.then(function (data) {
            console.log(data);
            res.json(data);
            client.close();
        })
    })
})

app.post('/login', function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db("GDB");

        var result = db.collection("gamers").findOne({ email: req.body.email });


        result.then(function (gamerdata) {
            

            bcrypt.compare(req.body.password, gamerdata.password, function (err, theResult) {
                if (theResult == true) {
                    res.status(200).json({
                        message: "Access Granted"
                    })
                    
                }
                else {
                    res.status(402).json({
                        message: "Password Incorrect"
                    })
                }
            })
            client.close();
        })
    })
})





app.listen(3000);