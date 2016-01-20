'use strict';

let gulp        = require('gulp');
let browserify  = require('browserify');
let watchify    = require('watchify');
let babelify    = require('babelify');
let source      = require('vinyl-source-stream');
let path        = require('path');
let util        = require('gulp-util');
let browserSync = require('browser-sync');

module.exports = function(watch) {
  var bundler, rebundle;

  bundler = browserify({
    entries: ['./src/main.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
  });

  bundler = watchify(bundler);

  bundler.transform(babelify, {
		"presets": [
				"es2015",
				"stage-0"
			],
		"plugins": [
			"angular2-annotations",
			"transform-decorators-legacy",
			"transform-class-properties",
    	"transform-flow-strip-types",
      "transform-async-to-generator"
		]
	});

  rebundle = function() {
    return bundler.bundle()
      .on('error', function(err){
        util.beep();
        util.log(err.message);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/'))
      .pipe(browserSync.stream());
  };

  bundler.on('update', function(ids){
    let files = ids.map(id => path.basename(id)).join(',');
    util.log('Changed', files);
    return rebundle();
  });

  bundler.on('log', function(msg){
    util.log(msg);
  });

  return rebundle();
}
