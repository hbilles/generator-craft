var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('src/scss/**/*.scss', ['sassWatch']);
	//gulp.watch('src/htdocs/**', ['copy']);
	// Note: The browserify task handles js recompiling with watchify
	gulp.watch('src/js/**/*.js', ['scripts']);
});
