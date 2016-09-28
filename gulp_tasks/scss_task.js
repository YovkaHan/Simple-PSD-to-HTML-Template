'use strict';

const $ = require('gulp-load-plugins')();

const gulp    =   require('gulp');
const multipipe    =   require('multipipe');
const combine = require('stream-combiner2').obj; 

module.exports = function(options) {
	return function(){
		return multipipe(
			gulp.src(options.src),
			$.cached(options.name),
			$.sass(),
			$.autoprefixer(),
			$.remember(options.name),
			$.concat('all.min.css'),
			$.if(!(options.isDevelopment),$.rev()),
			$.if(!(options.isDevelopment),$.cleanCss({compatibility: 'ie8'})),
			gulp.dest(options.dst),
			$.if(!(options.isDevelopment), combine($.rev.manifest('css.json'), gulp.dest('manifest')))
		).on('error', $.notify.onError(function(err){
				return {
					title: 'Scss_Task Error',
					message: err.message
				};
			}));
	}
};