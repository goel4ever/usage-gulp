/**
 * Created by agoel on 5/4/15.
 */

'use strict';

/**
 * ===================================================
 * Workflow Management::
 * ===================================================
 *
 * Start by:
 * a. Clean existing folder
 * b. Find all the files being used
 * c. Minify the files
 * d. Concatenate the files into modularized files
 * e. Save the final files
 * f. Replace the references in template
 *
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
 * 16. Build failure management??
 *
 */
// require - Node method that tells that gulp is required by the code
var gulp = require('gulp'),
    del = require('del'),
    // Add more 'src' files at any point in the pipeline
    addSrc = require('gulp-add-src'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    jshint = require('gulp-jshint'),
    //
    usemin = require('gulp-usemin'),
    //
    uglify = require('gulp-uglify'),
    // Minify CSS files
    minify_css = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    preen = require('preen');

/**
 * [START] - Find all the files =====================================
 */
var jsSources = [
  'components/**/*.js'
];
var jsDestination = 'dist/development/js';

var sassSources = [
  'components/**/*.scss'
];
var sassDestination = 'dist/development/css';
/**
 * [END] - Find all the files =======================================
 */


/**
 * [START] - Define executable tasks ================================
 */
// Clean Distribution folder before executing any task
gulp.task('clean:dist', function(cb) {
  del([
    // here we use a globbing pattern to match everything inside the `dist` folder
    'dist/**/*',
    // we don't want to clean this file though so we negate the pattern
    '!dist/mobile/deploy.json'
  ], cb);
});
// Clean Temporary folder after executing all tasks
gulp.task('clean:tmp', function(cb) {
  del([
    // here we use a globbing pattern to match everything inside the `dist` folder
    'tmp/**/*'
  ], cb);
});
/**
 * [END] - Define executable tasks ==================================
 */


/**
 * Task [JSHint] - Meant to lint JS files
 */
gulp.task('lint:js', function() {
  gulp.src(jsSources)
    .pipe(jshint()
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

/**
 * Task [js] - Meant to Concatenate JS files into one single file
 */
gulp.task('concat:js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js')
      .on('error', gutil.log))
    .pipe(gulp.dest(jsDestination));
});

/**
 * Task [Uglify] - Meant for logging purposes as of now
 */
gulp.task('uglify:js', function() {
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

/**
 * [START] - Tasks to be exported for consumption ================================
 */
gulp.task('default', ['clean:dist', 'concat:js', 'uglify:js', 'clean:tmp']);
gulp.task('build', ['clean:dist', 'clean:tmp']);
gulp.task('debug', ['clean:dist', 'clean:tmp']);
gulp.task('release', ['clean:dist', 'clean:tmp']);
/**
 * [END] - Tasks to be exported for consumption ==================================
 */
