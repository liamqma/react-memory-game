var gulp = require('gulp');

gulp.task('default', function () {

    gulp.src(['./package.json', 'server.js', 'Procfile', 'public/*', 'public/**/*'], {base: './'})
        .pipe(gulp.dest('build'));

});