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
 * a. Clean existing distribution folder
 * b. Preen bower packages based on need and configuration in bower json
 * c. Find all files in bower components and create one each js/css by concatenating only (call it vendor.js and vendor.css)
 * d. Find all the files being used from source
 * e. Minify the files
 * f. Concatenate the files into modularized files
 * g. Save the final files
 * h. Replace the references in template
 * i. Add header to generated files
 * j. Copy remaining files to the dist folder, for e.g., images, fonts
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
 * 16. Build failure management?? Exit on error and not proceed further.
 * 17. How about adding Git hooks?
 *
 */
// require - Node method that tells that gulp is required by the code
var gulp = require('gulp'),
    del = require('del'),
    add_header = require('gulp-header'),
    // Add more 'src' files at any point in the pipeline
    addSrc = require('gulp-add-src'),
    // Replace etc with etc
    replace = require('gulp-replace'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    jshint = require('gulp-jshint'),
    jshint_stylish = require('jshint-stylish'),
    //
    usemin = require('gulp-usemin'),
    //
    uglify = require('gulp-uglify'),
    // Minify CSS files
    minify_css = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    preen = require('preen'),
    copy = require('gulp-contrib-copy'),
    clean = require('gulp-contrib-clean'),
    watch = require('gulp-watch');


/**
 * [START] - Define executable tasks ================================
 */
// Clean Distribution folder before executing any task
gulp.task('clean:dist', function(cb) {
  del([
    // here we use a globbing pattern to match everything inside the `dist` folder
    'dist/**/*',
    // Delete the folder itself
    'dist',
    // TODO: Negation does not work as of now. Figure out an alternative.
    // we don't want to clean this file though so we negate the pattern
    // TODO: remove script.js file once solution identified
    '!dist/development/js/script.js',
    '!dist/mobile/deploy.json'
  ], cb);
});
// Clean Temporary folder after executing all tasks
gulp.task('clean:tmp', function(cb) {
  del([
    // here we use a globbing pattern to match everything inside the `dist` folder
    'tmp'
  ], cb);
});
/**
 * Task [Clean:Preen] - Meant to delete files that are not required in the package when building or working.
 * Configuration is based on definition in bower.json
 */
gulp.task('clean:preen', function(cb) {
  preen.preen({}, cb);
});
// Add header to each file generated
gulp.task('add:header', function() {
  gulp.src(jsAppDestination + '/**/*')
    .pipe(add_header("/* This file is auto-generated — do not edit by hand! */\n"))
    .pipe(gulp.dest(jsAppDestination));

  gulp.src(cssAppDestination + '/**/*.css')
    .pipe(add_header("/* This file is auto-generated — do not edit by hand! */\n"))
    .pipe(gulp.dest(cssAppDestination));

  gulp.src(htmlAppDestination + '/**/*.html')
    .pipe(add_header("<!-- This file is auto-generated — do not edit by hand! -->\n"))
    .pipe(gulp.dest(htmlAppDestination));
});
/**
 * [END] - Define executable tasks ==================================
 */


/**
 * Task [JSHint] - Meant to lint JS files
 */
gulp.task('lint:js', function() {
  gulp.src(jsAppSources)
    .pipe(jshint()
      .on('error', gutil.log))
    .pipe(jshint.reporter("default"));
    // New plugin is good but needs more work as converting errors to warning. Switching back as of now.
    //.pipe(jshint.reporter(jshint_stylish));
});

/**
 * Task [Uglify] - Meant for logging purposes as of now
 */
gulp.task('uglify:js', ['lint:js'], function() {
  return gulp.src(jsAppSources)
    .pipe(uglify()
      .on('error', gutil.log))
    .pipe(gulp.dest(jsAppDestination));
});

/**
 * Task [js] - Meant to Concatenate JS files into one single file
 */
gulp.task('concat:js', ['lint:js', 'uglify:js'], function() {
  return gulp.src(jsAppSources)
    .pipe(concat('script.js')
      .on('error', gutil.log))
    .pipe(gulp.dest(jsAppDestination));
});

/**
 * Task [Sass] - Meant for Compiling Sass (.scss) files to CSS file
 */
gulp.task('sass', function() {
  gulp.src(cssAppSources)
    .pipe(compass()
      .on('error', gutil.log))
    .pipe(gulp.dest(cssAppDestination));
});

/**
 * Task [util:copy] - Meant to provide a way to copy files or folder from source to destination
 */
gulp.task('util:copy', function() {
  gulp.src(jsAppSources)
    .pipe(copy()
      .on('error', gutil.log))
    .pipe(gulp.dest(jsAppDestination));
});

/**
 * Task [util:clean] - Meant to delete files and folders in a given path
 * 'dist/development/js/project/scripts/*'
 * 'dist/development/js/project/scripts/**'
 * 'dist/development/js/project/scripts/** /*'
 * 'dist/development/js/project/** /*'
 * 'dist/development/js/project/scripts'
 * 'dist/development/js/project/scripts'
 */
gulp.task('util:clean', function() {
  gulp.src(allDestination)
    .pipe(clean());
});



/**
 * [START] - Find all the files =====================================
 */
var allSources = 'components';
var allDestination = 'dist';

var jsAppSources = [
  'components/**/*.js'
];
var jsAppDestination = 'dist/development/js';
var cssAppSources = [
  //'components/**/*.scss',
  'components/project/sass/main.scss'
];
var cssAppDestination = 'dist/development/css';
var htmlAppSources = [
  'components/**/*.html'
];
var htmlAppDestination = 'dist/development/html';

var jsVendorSources = [
  'bower_components/**/*.js'
];
var jsVendorDestination = 'dist/development/js';
var cssVendorSources = [
  'bower_components/**/*.scss'
];
var cssVendorDestination = 'dist/development/css';
/**
 * [END] - Find all the files =======================================
 */



/**
 * [START] - Tasks built to handle individual components =========================
 */
// TODO: Can have asynchronous tasks only during dependencies, which includes processing on js/html/css
gulp.task('build:js', ['lint:js', 'uglify:js', 'concat:js', 'add:header'], function() {
  console.log('Main JS Task completed');
});
gulp.task('build:css', ['sass'], function() {
  console.log('Main CSS Task completed');
});
gulp.task('build:html', ['html'], function() {
  console.log('Main HTML Task completed');
});
gulp.task('server', ['clean:dist', 'clean:tmp']);
gulp.task('watch', function() {
  gulp.watch("components/**/*.js", ['lint:js']);
});
gulp.task('temporary', ['clean:dist', 'concat:js', 'clean:tmp'], function() {
  console.log('Main HTML Task completed');
});
/**
 * [END] - Tasks built to handle individual components ===========================
 */



/**
 * [START] - Tasks to be exported for consumption ================================
 */
gulp.task('build', ['build:js', 'build:css', 'build:html'], function() {
  console.log('Build Task completed');
});
gulp.task('debug', ['clean:dist', 'clean:tmp'], function() {
  console.log('Debug Task completed');
});
gulp.task('release', ['clean:dist', 'clean:tmp'], function() {
  console.log('Release Task completed');
});
/**
 * [END] - Tasks to be exported for consumption ==================================
 */
