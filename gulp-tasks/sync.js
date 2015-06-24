// Load required modules
var gulp    = require( 'gulp' );
var notify  = require( 'gulp-notify' );
var plumber = require( 'gulp-plumber' );
var rsync   = require( 'gulp-rsync' );
var size    = require( 'gulp-size' );

// Load config file
var config  = require( '../gulp-tasks/config' ).rsync;
var general  = require( '../gulp-tasks/config' ).general;

var onError = function(err) {
	notify.onError( config.notify.error )( err );
	this.emit('end');
};


gulp.task( 'sync', function() {
	var s = size( );
	var sg = size( { gzip: true } );
	return gulp.src( config.src )
	.pipe( plumber( {
		errorHandler: onError
		} ) )
	.pipe( s )
	.pipe( sg )
	.pipe( rsync( config.options ) )
	.pipe( notify( {
		title: config.notify.sucess.title,
		message: function( ) {
			return config.notify.sucess.message + ' ' + general.totalSizeMessage + ' ' + s.prettySize + ' ' + general.gzipMessage + ' ' + sg.prettySize;
		},
		onLast: true
	} ) );
} );
