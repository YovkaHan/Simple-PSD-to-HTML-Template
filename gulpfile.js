'use strict';

const $ = require('gulp-load-plugins')();
const gulp         =   require('gulp');
const path         =   require('path');
const multipipe    =   require('multipipe');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function requireUserTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback){
		let task = require(path).call(this, options);
		
		return task(callback);
	});
}

requireUserTask('scss', './gulp_tasks/scss_task', {
	src: 'frontend/styles/**/*.scss',
	dst: 'public/css',
	name: 'scss',
	isDevelopment: isDevelopment
	
});

requireUserTask('js', './gulp_tasks/js_task', {
	src: 'frontend/js/webpacked/**/*.js',
	dst: 'public/js',
	name: 'js',
	isDevelopment: isDevelopment
});

requireUserTask('clean', './gulp_tasks/clean_task', {
	dst: 'public'
});

requireUserTask('assets', './gulp_tasks/assets_task', {
	src: 'frontend/assets/**',
	dst: 'public',
	name: 'assets',
	isDevelopment: isDevelopment
});

requireUserTask('imgs', './gulp_tasks/imgs_task', {
	src: 'frontend/styles/**/*.{jpg,png,svg}',
	dst: 'public/img',
	name: 'imgs'
});

requireUserTask('webpack', './gulp_tasks/webpack_task', {
	src: 'frontend/js/*.js',
	dst: 'public/js',
	name: 'webpack'
});

gulp.task('build', gulp.series(
	'clean',
	'webpack',
	gulp.parallel('imgs' ,'scss'),
	'assets')
);

gulp.task('watch', function() {
	gulp.watch('frontend/styles/**/*.scss', gulp.series('scss')).on('unlink', function(filepath) {
		$.remember.forget('scss', path.resolve(filepath));
		delete $.cached.caches.scss[path.resolve(filepath)];
	});
	gulp.watch('frontend/assets/**/*.*', gulp.series('assets')).on('unlink', function(filepath) {
		$.remember.forget('assets', path.resolve(filepath));
		delete $.cached.caches.assets[path.resolve(filepath)];
	});
	gulp.watch('frontend/styles/**/*.{jpg, png, svg}', gulp.series('imgs')).on('unlink', function(filepath) {
		$.remember.forget('imgs', path.resolve(filepath));
		delete $.cached.caches.imgs[path.resolve(filepath)];
	});
	gulp.watch('frontend/js/**/*.js', gulp.series('webpack')).on('unlink', function(filepath) {
		$.remember.forget('webpack', path.resolve(filepath));
		delete $.cached.caches.webpack[path.resolve(filepath)];
	});
});

gulp.task('dev', gulp.series('build', 'watch'));

