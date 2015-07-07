// Load required modules
var gulp    = require( 'gulp' ),
	notify  = require( 'gulp-notify' ),
	plumber = require( 'gulp-plumber' ),
	rsync   = require( 'gulp-rsync' ),

// Load config file
	config = require( '../gulp-tasks/config' ).rsync,
	size   = require( '../gulp-tasks/config' ).size;

gulp.task( 'sync', function() {
	return gulp.src( config.src )
	.pipe( plumber( {
		errorHandler: config.notifyError
		} ) )
	.pipe( size.s )
	.pipe( size.sg )
	.pipe( rsync( config.options ) )
	.pipe( notify( {
		title: config.notifyOnSucess.title,
		message: function( ) {
			return config.notifyOnSucess.message + ' ' + size.totalSizeMessage + ' ' + size.s.prettySize + ' ' + size.gzipMessage + ' ' + size.sg.prettySize;
		},
		onLast: true
	} ) );
} );
