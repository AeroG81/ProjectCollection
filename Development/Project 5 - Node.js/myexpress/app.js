var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var pug = require('pug');
//nodemon

const PORT = 3000;

var app = express();

app.use(function(req,req,next){
    console.log('Time: ',Date.now());
    next();
});

//app.set('view engine','pug');//pug template engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'staticfolder')));

app.get('/',function(req,res,){
    //pug template engine at /views
    res.render('index',{
        title: 'Hello World',
        showTitle: true,
        people: ['John','Steve','Jose']
    });
});

app.get('/about',function(req,res,){
    res.send('About Page!<a href="/">Link</a>');
});

app.listen(PORT);
console.log('Server started on port '+PORT);

module.exports = app;