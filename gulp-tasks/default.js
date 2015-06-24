// Load required modules
var gulp        = require( 'gulp' );
var notify      = require( 'gulp-notify' );
var runSequence = require( 'run-sequence' );

gulp.task( 'default', function( notification ) {
	runSequence(
		'stylus',
		[ 'scripts', 'styles', 'optimages' ],
		'sync',
		notification
	);
} );


var notification = function( ){
	notify( {
		title: 'Default Task',
		message: function( ) {
			return 'Default Finished';
		},
		onLast: true
	} )
};
