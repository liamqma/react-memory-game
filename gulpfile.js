var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var react = require('gulp-react');
var runSequence = require('run-sequence');

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


// Default
gulp.task('default', function(callback) {

    runSequence('clean', ['copy', 'coffee', 'react'], callback);

});

