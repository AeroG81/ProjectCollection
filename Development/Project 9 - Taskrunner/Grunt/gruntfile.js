module.exports = function(grunt){
    grunt.initConfig({
        concat:{
            js: {
                src: ['src/js/first.js','src/js/sec.js','src/js/third.js'],
                dest: 'dist/js/app.bundle.js'
            },
            css: {
                src: ['src/css/first.css','src/css/sec.css','src/css/third.css'],
                dest: 'dist/css/app.bundle.css'
            }
        },
        watch:{
            js:{
                files: ['src/js/*.js'],
                tasks:['concat']
            },
            css:{
                files: ['src/css/*.css'],
                tasks:['concat']
            }
        }
    })
    
    grunt.registerTask('test',function(){
        console.log("test task executed");
    });
    //to run concat at terminal need to enter grunt concat
    grunt.loadNpmTasks('grunt-contrib-concat');
    //to allow user type grunt and run task instead of typing grunt concat
    grunt.registerTask('default',[/*'test',*/'watch']);

    //grunt watch plugin
    grunt.loadNpmTasks('grunt-contrib-watch');
};