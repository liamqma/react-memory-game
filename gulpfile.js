var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var react = require('gulp-react');
var runSequence = require('run-sequence');
var server = require('gulp-develop-server');

var paths = {
    scripts: ['public/src/*.jsx']
};

// Delete files within build directory
gulp.task('clean', function () {

    return del(['./build/*']);
});

// Copy necessary files to build directory
gulp.task('copy', function () {

    return gulp.src(['./package.json', 'Procfile', 'public/lib/*', 'public/images/*', 'public/index.html', 'public/styles.css'], {base: './'})
        .pipe(gulp.dest('build'));

});

// Transform coffee script to javascript, and copy to build directory
gulp.task('coffee', function () {

    return gulp.src('./server.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./build/'))

});

// Transform .jsx to .js, and copy to build directory
gulp.task('react', function () {

    return gulp.src('./**/*.jsx')
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('./build/'));

});

// Watch
gulp.task('watch', function(){

    gulp.watch(paths.scripts, ['react'])

});


// Build
gulp.task('build', function (callback) {

    return runSequence('clean', 'copy', ['coffee', 'react'], callback);

});

// Run server
gulp.task('server:start', function () {
    return server.listen({path: './build/server.js'});
});

// Finally default:
gulp.task('default', function (callback) {
    runSequence('build', 'server:start', 'watch', callback);
});
