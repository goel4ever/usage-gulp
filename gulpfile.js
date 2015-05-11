/**
 * Created by agoel on 5/4/15.
 */

'use strict';

/**
 * Tasks that a build manager would be required to do:
 * 1. Lint JS
 * 2. Concat JS (into modular js files in temp folder or something)
 * 3. Minify JS (files in temp folder)
 * 4. Uglify JS (files in temp folder)
 * 5. Have one task doing all of this
 *
 * 6. Lint HTML
 * 7. Remove comments etc from HTML
 *
 * 8. Convert Sass and Less into CSS
 * 9. Lint CSS after or before #8
 * 10.Minify CSS
 * 11.Uglify CSS
 *
 * 12. Cache management
 * 13. Package management - dev-test-prod
 * 14. Create a server
 *
 * 15. Can we Multi-thread few tasks that are unrelated???
 *
 */
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

/**
 * Task [Default] - Meant for logging purposes as of now
 */
gulp.task('default', function() {
  gutil.log('Learning Gulp')
    .on('error', gutil.log);
});

/**
 * Task [JSHint] - Meant to lint JS files
 */
gulp.task('jshint', function() {
  gulp.src(jsSources)
    .pipe(jshint()
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

/**
 * Task [js] - Meant to Concatenate JS files into one single file
 */
gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js')
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

/**
 * Task [Default] - Meant for logging purposes as of now
 */
gulp.task('uglify', function() {
  gulp.src(jsSources)
    .pipe(uglify()
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

/**
 * Task [Sass] - Meant for Compiling Sass (.scss) files to CSS file
 */
gulp.task('sass', function() {
  gulp.src(sassSources)
    .pipe(compass())
    .gulp.dest(sassDestination);
});

/**
 * Task [Preen] - Meant to delete files that are not required in the package when building or working
 */
gulp.task('preen', function(cb) {
  preen.preen({}, cb);
});
