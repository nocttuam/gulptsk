// Load required modules
var gulp        = require( 'gulp' ),
	runSequence = require( 'run-sequence' ),
	config      = require( '../gulp-tasks/config' ).default;

gulp.task( 'default', function( notification ) {
	runSequence(
		'stylus',
		[ 'scripts', 'styles', 'images' ],
		'sync',
		config.notification
	);
} );
