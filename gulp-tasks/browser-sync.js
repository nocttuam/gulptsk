// Load modules and configurations
var gulp        = require( 'gulp' ),
	browserSync = require( 'browser-sync' ).create(),
	config      = require( '../gulp-tasks/config' ).browserSync;

gulp.task( 'browser-sync', function() {
	browserSync.init( config.options );
} );
