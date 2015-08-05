// Load plugins
var gulp     = require( 'gulp' ),
	del      = require( 'del' ),
	notify   = require( 'gulp-notify' ),
// Load config file
	config = require( '../gulp-tasks/config' ).delete;

gulp.task( 'clear-dest-sync', function ( ) {
	del(
		config.path.serverFiles,
		{ force: true }, // Delete external files.
		function( err ){
			notify( {
				title: 'Clear Remote Folder',
				message: function( ) {
					return 'Fineshed Clear Remote Folder';
				},
				onLast: true
			} );
		}
	);
} );
