'use strict';

/*  Load gulp + plugins
/* ------------------------------------------------------------------------- */

var notify  = require("gulp-notify");

/*  Notify on build error
 *  Keep gulp from hanging on this task
/* ------------------------------------------------------------------------- */

module.exports  = function (errorObject, callback) {

  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);

  if (typeof this.emit === 'function') {
    this.emit('end');
  }

};
