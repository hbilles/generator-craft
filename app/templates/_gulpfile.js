var $          = require('gulp-load-plugins')(),
	argv       = require('yargs').argv,
	browser    = require('browser-sync'),
	browserify = require('browserify'),
	buffer     = require('vinyl-buffer'),
	gulp       = require('gulp'),
	rimraf     = require('rimraf'),
	sequence   = require('run-sequence'),
	source     = require('vinyl-source-stream');

// Check for --production flag
var isProduction = !!(argv.production);

// Development URL
var DEVURL = 'http://<%= domainName %>.dev'

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
	sass: [
		'node_modules/bourbon/app/assets/stylesheets',
		'node_modules/bourbon-neat/app/assets/stylesheets'
	],
	templates: [
		'public/ui/templates/**/*.twig'
	]
};

// Delete the "build" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
	rimraf('public/ui/build', done);
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
	var minifycss = $.if(isProduction, $.minifyCss());

	return gulp.src('src/scss/styles.scss')
	.pipe($.sourcemaps.init())
	.pipe($.sass({
		includePaths: PATHS.sass
	})
		.on('error', $.sass.logError))
	.pipe($.autoprefixer({
		browsers: COMPATIBILITY
	}))
	.pipe(minifycss)
	.pipe($.if(!isProduction, $.sourcemaps.write()))
	.pipe(gulp.dest('public/ui/build/css'));
});

// Browserify javascript
// In production, the file is minified
gulp.task('javascript', function() {
	var opts = $.if(!isProduction, {
			debug: true
		}),
		uglify = $.if(isProduction, $.uglify()
		.on('error', function (e) {
			console.log(e);
		}));

	return browserify(['src/js/app.js'], opts)
		.bundle()
		.on('error', function(e) {
			console.log(e);
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify)
		.pipe(gulp.dest('public/ui/build/js'));
});

// Build the "build" folder by running all of the above tasks
gulp.task('build', function(done) {
	sequence('clean', ['sass', 'javascript'], done);
});

// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
	browser.init({
		proxy: DEVURL
	});
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
	gulp.watch(PATHS.templates, [browser.reload]);
	gulp.watch(['src/scss/**/*.scss'], ['sass', browser.reload]);
	gulp.watch(['src/js/**/*.js'], ['javascript', browser.reload]);
});
