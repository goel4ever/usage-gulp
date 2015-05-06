/**
 * Created by agoel on 5/4/15.
 */

'use strict';

// require - Node method that tells that gulp is required by the code
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass');

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