'use strict';

const $ = require('gulp-load-plugins')();

const gulp    =   require('gulp');
const multipipe    =   require('multipipe');

module.exports = function(options) {
	return function(){
		return multipipe(
			gulp.src(options.src),
			$.if(!options.isDevelopment, $.revReplace({
				manifest: gulp.src('manifest/css.json')
			})),
			$.cached(options.name),
			$.remember(options.name),
			$.newer(options.dst),
			gulp.dest(options.dst)
		).on('error', $.notify.onError(function(err){
				return {
				title: 'Assets_Task Error',
				message: err.message
				};
			}))
	}
};