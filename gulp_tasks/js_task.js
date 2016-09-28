'use strict';

const $ = require('gulp-load-plugins')();

const gulp    =   require('gulp');
const multipipe    =   require('multipipe');
 

module.exports = function(options) {
	return function(){
		return multipipe(
			gulp.src(options.src),
			$.cached(options.name),
			$.remember(options.name),
			$.concat('all.min.js'),
			$.uglify(),
			gulp.dest(options.dst)
		).on('error', $.notify.onError(function(err){
				return {
					title: 'JS_Task Error',
					message: err.message
				};
			}));
	}
};