'use strict';

let gulp        = require('gulp');
let scripts     = require('../helper/browserify');

gulp.task('browserify', function(){
	return scripts(true);
});
