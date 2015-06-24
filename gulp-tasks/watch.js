var gulp = require( 'gulp' );

gulp.task( 'watch', [ 'default' ], function() {
	gulp.watch( 'src/styl/**/*.styl', [ 'stylus' ] );
	gulp.watch( 'src/css/**/*.css', [ 'styles' ] );
	gulp.watch( 'src/js/**/*.js', [ 'scripts' ] );
	gulp.watch( 'src/images/**/*.+(png|jpg|jpeg|gif|ico)', [ 'optimages' ] );
	gulp.watch( 'public/**/*', [ 'sync' ] );
} );
