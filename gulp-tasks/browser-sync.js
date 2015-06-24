// Load modules and configurations
var gulp        = require( 'gulp' );
var browserSync = require( 'browser-sync' ).create();
var config      = require( '../gulp-tasks/config' ).browserSync;

gulp.task( 'browser-sync', function() {
	browserSync.init( config.options );
} );