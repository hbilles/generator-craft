var sass         = require('gulp-sass'),
	gulp         = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	minify       = require('gulp-minify-css'),
	browserSync  = require('./browserSync'),
	notify       = require('gulp-notify'),
	handleErrors = require('../util/handleErrors');


gulp.task('sass', function() {
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(minify())
		.pipe(gulp.dest('./public/ui/build/css'))
		.on('error', handleErrors);
});

gulp.task('sassWatch', function() {
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
		.pipe(minify())
		.pipe(gulp.dest('./public/ui/build/css'))
		.pipe(browserSync.reload({stream:true}))
		.on('error', handleErrors);
})
