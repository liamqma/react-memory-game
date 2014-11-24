var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');

gulp.task('default', function () {

    gulp.src(['./package.json', 'server.js', 'Procfile', 'public/*', 'public/**/*'], {base: './'})
        .pipe(gulp.dest('build'));


    gulp.src('./server.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./build/'))

});