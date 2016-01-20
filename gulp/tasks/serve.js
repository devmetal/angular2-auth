'use strict';

let gulp = require('gulp');
let seq = require('run-sequence');

gulp.task('serve', function(done){
  seq('sass', 'browserify', 'browserSync', done);
});
