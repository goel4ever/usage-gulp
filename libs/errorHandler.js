'use strict';

/*  Load gulp + plugins
/* ------------------------------------------------------------------------- */

var gutil = require('gulp-util');

/*  Notify on build error
 *  Keep gulp from hanging on this task
 *  Go 'beep' on build error :)
/* ------------------------------------------------------------------------- */

module.exports  = function(error) {

  var header;

  header  = '\n[' + gutil.colors.red(' --- Error in ' + error.plugin + ' --- ') + ']\n';

  gutil.log(header, error.message, this.emit('end'));

  return gutil.beep();

};
