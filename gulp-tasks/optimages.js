// Load plugins
var gulp     = require( 'gulp' );
var changed  = require( 'gulp-changed' );
var chmod    = require( 'gulp-chmod' );
var imagemin = require( 'gulp-imagemin' );
var notify   = require( 'gulp-notify' );
var plumber  = require( 'gulp-plumber' );
var size     = require( 'gulp-size' );

// Load config file
var config   = require( '../gulp-tasks/config' );

var onError = function(err) {
	notify.onError( config.optimages.notify.error )( err );
	this.emit('end');
};

gulp.task( 'optimages', function() {
	var s = size( );
	var sg = size( { gzip: true } );
	return gulp.src( config.optimages.src )
	.pipe( plumber( {
		errorHandler: onError
		} ) )
	.pipe( s )
	.pipe( sg )
	.pipe( changed( config.optimages.dest ) )
	.pipe( imagemin( config.imagemin ) )
	.pipe( chmod( 644 ) )
	.pipe( gulp.dest( config.optimages.dest ) )
	.pipe( notify( {
		title: config.optimages.notify.sucess.title,
		message: function( ) {
			return config.optimages.notify.sucess.message + ' ' + config.general.totalSizeMessage + ' ' + s.prettySize + ' ' + config.general.gzipMessage + ' ' + sg.prettySize;
		},
		onLast: true
	} ) );
} );
