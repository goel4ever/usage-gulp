/**
 * Created by agoel on 5/4/15.
 */

'use strict';

// require - Node method that tells that gulp is required by the code
var gulp = require('gulp'),
    addSrc = require('gulp-add-src'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    preen = require('preen');

var jsSources = [
  'components/**/*.js'
];
var jsDestination = 'builds/development/js';

var sassSources = [
  'components/**/*.scss'
];
var sassDestination = 'builds/development/css';

gulp.task('default', function() {
  gutil.log('Learning Gulp')
    .on('error', gutil.log);
});

gulp.task('jshint', function() {
  gulp.src(jsSources)
    .pipe(jshint()
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js')
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

gulp.task('sass', function() {
  gulp.src(sassSources)
    .pipe(compass())
    .gulp.dest(sassDestination);
});

gulp.task('uglify', function() {
  gulp.src(jsSources)
    .pipe(uglify()
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

gulp.task('preen', function(cb) {
  preen.preen({}, cb);
});
