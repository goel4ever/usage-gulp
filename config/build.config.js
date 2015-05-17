/**
 * Created by agoel on 5/15/15.
 */

'use strict';

module.exports = {
  src: {
    path: './src',
    app: {
      scripts: [
        'src/**/*.js'
      ],
      styles: [
        'src/**/*.less',
        'src/**/*.css'
      ],
      templates: [
        'src/**/*.html'
      ]
    },
    vendor: {
      scripts: [
        'bower_components/**/*.js'
      ],
      styles: [
        'bower_components/**/*.min.css'
      ],
      templates: ''
    }
  },
  dest: {
    path: './dist',
    app: {
      scripts: 'dist/scripts',
      styles: 'dist/styles',
      templates: 'dist/html'
    },
    vendor: {
      scripts: 'dist/scripts',
      styles: 'dist/styles',
      templates: 'dist/html'
    }
  }
};