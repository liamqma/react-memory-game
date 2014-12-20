gulp = require 'gulp'
del = require 'del'
react = require 'gulp-react'
runSequence = require 'run-sequence'
nodemon = require 'gulp-nodemon'
stylus = require 'gulp-stylus'
plumber = require 'gulp-plumber'

# Delete files within build directory
gulp.task 'clean', -> del ['public/build/*']

# Transform .jsx to .js, and copy to build directory
gulp.task 'react', ->
  gulp.src('public/scripts/*.jsx')
    .pipe(plumber())
    .pipe(react(harmony: true))
    .pipe(gulp.dest('./public/build/scripts'))

# Transform .styl to .css, and copy to build directory
gulp.task 'stylus', ->
  gulp.src('public/styles/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/build/styles'))

gulp.task 'build', (callback) ->
  runSequence "clean", ["react", "stylus"], callback

gulp.task 'watch', ->
  gulp.watch ['public/scripts/*.jsx'], ['react']
  gulp.watch ['public/styles/styles.styl'], ['stylus']

gulp.task 'server:start', -> nodemon { script: 'server.coffee'}

gulp.task 'default', (callback) ->
  runSequence('build', 'server:start', 'watch', callback)

