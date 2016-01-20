'use strict';

let gulp        = require('gulp');
let sourcemaps  = require('gulp-sourcemaps');
let sass        = require('gulp-sass');
let browserSync = require('browser-sync');

gulp.task('sass', function(){
  gulp.src('./src/sass/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
});
