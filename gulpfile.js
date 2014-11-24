var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var del = require('del');
var react = require('gulp-react');


gulp.task('clean', function (callback) {

    del(['./build/*'], callback);
});

gulp.task('copy', function () {

    gulp.src(['./package.json', 'server.js', 'Procfile', 'public/*', 'public/**/*'], {base: './'})
        .pipe(gulp.dest('build'));

});

gulp.task('coffee', function () {

    return gulp.src('./server.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./build/'))

});

gulp.task('react', function () {

    return gulp.src('./**/*.jsx')
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('./build/'));

});

gulp.task('default', ['clean'], function() {
    gulp.start(['copy', 'coffee', 'react']);
});