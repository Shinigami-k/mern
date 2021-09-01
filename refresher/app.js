"use strict"
const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();

app.use("/static",express.static(path.join(__dirname,'static')));
app.use("/node",express.static(path.join(__dirname,'node_modules')));
// define routes here..

app.get('/', function (req, res) {
    //res.send('hello');
    res.sendFile(path.join(__dirname, '/static/html/index.html'));
});

app.get('/getQuestions/:choice', function (req, res) {
    let data;
    console.log('i am getquestions');
    axios.get('https://opentdb.com/api.php?amount=10&category='+req.params.choice+'&type=multiple')
    .then((response) => {
        console.log(response.data);
        res.send(response.data);
    });
    
});

app.get('/quiz', (req, res)=> {
    res.sendFile(path.join(__dirname, '/static/html/quiz.html'));
});

app.get('/home/home.js', (req, res)=> {
    res.sendFile(path.join(__dirname, '/static/js/home.js'));
});

app.listen(5000, function () {
    console.log('Node server is running..');
});