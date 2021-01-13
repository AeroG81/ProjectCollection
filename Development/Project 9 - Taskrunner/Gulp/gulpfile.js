var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

//test
gulp.task('test', function(){
    console.log('Test executed');
});

//minify js file
gulp.task('minifyjs',function(){
    return gulp.src('src/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
});

//compile scss to css (unable to install gulp-sass)

//jshint
gulp.task('jshint',function(){
    return gulp.src('src/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
})

//default task
gulp.task('default',gulp.series('minifyjs','jshint'));