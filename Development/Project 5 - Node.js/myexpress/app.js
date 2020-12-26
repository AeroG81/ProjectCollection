var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const PORT = 3000;

var app = express();

app.use(function(req,req,next){
    console.log('Time: ',Date.now());
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'staticfolder')));

app.get('/',function(req,res,){
    res.send('Hello World!<a href="/about">Link</a>');
    
});

app.get('/about',function(req,res,){
    res.send('About Page!<a href="/">Link</a>');
});

app.listen(PORT);
console.log('Server started on port '+PORT);

module.exports = app;