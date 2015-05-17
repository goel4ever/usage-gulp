/**
 * Created by agoel on 5/15/15.
 */

'use strict';

module.exports = {
  src: {
    path: './components',
    app: {
      scripts: [
        'components/**/*.js'
      ],
      styles: [
        'components/project/**/*.less',
        'components/project/**/*.css'
      ],
      templates: [
        'components/**/*.html'
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