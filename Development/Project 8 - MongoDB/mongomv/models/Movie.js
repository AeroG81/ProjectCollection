var mongoose = require('mongoose');

//Movie Schema
var movieSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    actors: { type: Array },
    cover: { type: String },
    genre: { type: String },
    releaseDate: { type: Date },
})

var Movie = module.exports = mongoose.model('Movie', movieSchema);

module.exports.getMovies = function (callback, limit) {
    Movie.find(callback).limit(limit);
}

module.exports.getMovieById = function (id, callback) {
    Movie.findById(id,callback);
}
/*
db.movies.insert({
    title: 'Wonder Woman 1984',
    description: 'Rewind to the 1980s as Wonder Woman's next big screen adventure finds her facing two all-new foes: Max Lord and The Cheetah.',
    actors: ['Gal Gadot', 'Chris Pine', 'Kristen Wiig'],
    cover: 'https://m.media-amazon.com/images/M/MV5BNWY2NWE0NWEtZGUwMC00NWMwLTkyNzUtNmIxMmIyYzA0MjNiXkEyXkFqcGdeQXVyMTA2OTQ3MTUy._V1_UY1200_CR90,0,630,1200_AL_.jpg',
    genre: 'Adventure/Action',
    releaseDate: new Date('December 17, 2020')
})
*/