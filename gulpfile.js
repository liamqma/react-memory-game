var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var react = require('gulp-react');
var runSequence = require('run-sequence');
var server = require('gulp-develop-server');
var stylus = require('gulp-stylus');
var bower = require('bower');

var paths = {
    scripts: ['public/src/*.jsx'],
    styles: ['public/styles.styl']
};

// Delete files within build directory
gulp.task('clean', function () {

    return del(['./build/*']);
});

// Copy necessary files to build directory
gulp.task('copy', function () {

    return gulp.src(['./package.json', 'Procfile', 'public/lib/*', 'public/images/*', 'public/index.html'], {base: './'})
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

    return gulp.src('*/*/*.jsx')
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('./build'));

});

// Transform .styl to .css, and copy to build directory
gulp.task('stylus', function () {

    return gulp.src('*/*.styl').pipe(stylus()).pipe(gulp.dest('./build'));

});

// Install dependencies from bower
gulp.task('bower', function(){
    return bower.commands.install([], {save: true}, {})
});

// Watch
gulp.task('watch', function () {

    gulp.watch(paths.scripts, ['react']);
    gulp.watch(paths.styles, ['stylus']);

});


// Build
gulp.task('build', function (callback) {

    return runSequence('clean', 'bower', 'copy', ['coffee', 'react', 'stylus'], callback);

});

// Run server
gulp.task('server:start', function () {
    return server.listen({path: './build/server.js'});
});

// Finally default:
gulp.task('default', function (callback) {
    runSequence('build', 'server:start', 'watch', callback);
});
