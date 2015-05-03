/* scripts task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify'),
	browserSync  = require('./browserSync'),
	watchify     = require('watchify'),
	bundleLogger = require('../util/bundleLogger'),
	gulp         = require('gulp'),
	rename       = require('gulp-rename'),
	uglify       = require('gulp-uglify'),
	handleErrors = require('../util/handleErrors'),
	transform    = require('vinyl-transform');

gulp.task('scripts', function() {
	var browserified = transform(function(filename) {
		var b = browserify(filename, {
			debug: true,
			paths: ['./src/js'],
			extensions: ['.js']
		});
		return b.bundle();
	});

	var watchified = transform(function(filename) {
		var options = watchify.args;
		options.debug = true;
		options.paths = ['./src/js'];
		options.extensions = ['.js'];
		var w = watchify(browserify(filename, options));
		return w.bundle();
	});

	var buildFn = global.isWatching ? watchified : browserified;

	var bundler = function() {
		// Log when bundling starts
		bundleLogger.start();

		return gulp
				.src(['./src/js/app.js'])
				.pipe(buildFn)
				.on('error', handleErrors)
				.pipe(gulp.dest('./public/ui/build/js'))
				// Minify for production
				.pipe(rename('app.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest('./public/ui/build/js/'))
				// Reload the browser!
				.pipe(browserSync.reload({stream:true}))
				// Log when bundling completes!
				.on('end', bundleLogger.end);
	}

	return bundler();
});
