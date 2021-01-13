var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');

//test
gulp.task('test', function(){
    console.log('Test executed');
});

//minify js file
gulp.task('minifyjs',function(){
    return gulp.src('src/*.js').pipe(uglify()).pipe(gulp.dest('app/js'));
});

//compile scss to css (unable to install gulp-sass)

//jshint
gulp.task('jshint',function(){
    return gulp.src('src/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
})

gulp.task('webserver',function(){
    return gulp.src('app').pipe(webserver({
        port:'8000',
        livereload:true,
        open:true
    }));
})

//default task
gulp.task('default',gulp.series('minifyjs','jshint','webserver'));