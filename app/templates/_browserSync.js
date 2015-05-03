var gulp        = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('browserSync', function() {
	browserSync({
		proxy: 'http://<%= domainName %>.dev'
	});
});

module.exports = browserSync;
