var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var react = require('gulp-react');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var bower = require('gulp-bower');

var paths = {
    coffee: ['src/*.coffee'],
    scripts: ['public/src/*.jsx'],
    styles: ['public/styles.styl']
};

// Delete files within build directory
gulp.task('clean', function () {

    return del(['./build/*']);
});

// Copy necessary files to build directory
gulp.task('copy', function () {

    return gulp.src(['package.json', 'Procfile', 'public/images/*', 'public/index.html', 'public/flickr/*'], {base: './'})
        .pipe(gulp.dest('build'));

});

// Transform coffee script to javascript, and copy to build directory
gulp.task('coffee', function () {

    return gulp.src(['server.coffee', 'src/*.coffee'], {base: './'})
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./build/'))

});

// Transform .jsx to .js, and copy to build directory
gulp.task('react', function () {

    return gulp.src('*/*/*.jsx')
        .pipe(plumber())
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('./build'));

});

// Transform .styl to .css, and copy to build directory
gulp.task('stylus', function () {

    return gulp.src('*/*.styl').pipe(plumber()).pipe(stylus()).pipe(gulp.dest('./build'));

});

/**
 * Bower install dependencies
 */
gulp.task('bower', function () {
    return bower();
});

// Watch
gulp.task('watch', function () {

    gulp.watch(paths.scripts, ['react']);
    gulp.watch(paths.styles, ['stylus']);
    gulp.watch(paths.coffee, ['coffee']);

});

// Build
gulp.task('build', function (callback) {

    return runSequence('clean', 'bower', 'copy', ['coffee', 'react', 'stylus'], callback);

});

// Run server
gulp.task('server:start', function () {
    return nodemon({ script: 'build/server.js'})
});

// Finally default:
gulp.task('default', function (callback) {
    runSequence('build', 'server:start', 'watch', callback);
});
