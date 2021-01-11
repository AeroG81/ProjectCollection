var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/mongomovies');
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'Connection Error'));
db.once('open', function(){
    console.log('MongoDB connected');
});

var index = require('./routes/index');
var movie = require('./routes/movie');

var app = express();

app.use(bodyParser.json());

app.use('/',index);
app.use('/api/v1/movies',movie);

app.listen(3000,function(){
    console.log('server running on port 3000');
});

