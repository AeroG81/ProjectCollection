var express = require('express');
const { route } = require('.');
const Movie = require('../models/Movie');
var router = express.Router();

var movie = require('../models/Movie');

//list movies
router.get('/', function (req, res, next) {
    movie.getMovies(function (err, movies) {
        if (err) {
            res.send(err);
        }
        res.json(movies);
    }, 10);
});

//single movie
router.get('/:id', function (req, res, next) {
    movie.getMovieById([req.params.id], function (err, movies) {
        if (err) {
            res.send(err);
        }
        res.json(movies);
    });
});

//add movie
router.post('/', function (req, res, next) {
    var newFromBody = new Movie(req.body);

    var newMovie = new Movie({
        title: 'Wonder Woman 1984',
        description: `Rewind to the 1980s as Wonder Woman's next big screen adventure finds her facing two all-new foes: Max Lord and The Cheetah.`,
        actors: ['Gal Gadot', 'Chris Pine', 'Kristen Wiig'],
        cover: 'https://m.media-amazon.com/images/M/MV5BNWY2NWE0NWEtZGUwMC00NWMwLTkyNzUtNmIxMmIyYzA0MjNiXkEyXkFqcGdeQXVyMTA2OTQ3MTUy._V1_UY1200_CR90,0,630,1200_AL_.jpg',
        genre: 'Adventure/Action',
        releaseDate: new Date('December 17, 2020')
    })
    /*
    newFromBody.save(function(err,movie){
        if (err) {
            res.send(err);
        }
        res.json(movie);
    })
    */
    
    newMovie.save(function(err,movie){
        if (err) {
            res.send(err);
        }
        res.json(movie);
    })
    
});

//update movie
router.put('/:id',function(req,res,next){
    var query = {_id: [req.params.id]};
    var body = req.body;
    movie.updateOne(query,{$set:body},{},function(err,movies){
        if (err) {
            res.send(err);
        };
        res.json(movies);
    });
});

//delete movie
router.delete('/:id',function(req,res,next){
    var query = {_id: [req.params.id]};
    movie.remove(query,function(err){
        if (err) {
            res.send(err);
        };
        res.json({
            msg:"success"
        });
    });
});

module.exports = router;