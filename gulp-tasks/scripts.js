// Load required modules
var gulp       = require( 'gulp' );
var concat     = require( 'gulp-concat' );
var jshint     = require( 'gulp-jshint' );
var notify     = require( 'gulp-notify' );
var plumber    = require( 'gulp-plumber' );
var rename     = require( 'gulp-rename' );
var size       = require( 'gulp-size' );
var sourcemaps = require( 'gulp-sourcemaps' );
var uglify     = require( 'gulp-uglify' );

// Load config file
var config     = require( '../gulp-tasks/config' ).scripts;
var general    = require( '../gulp-tasks/config' ).general;

var onError = function(err) {
	notify.onError( config.notify.error )( err );
	this.emit('end');
};


gulp.task( 'scripts', function() {
	var s = size( );
	var sg = size( { gzip: true } );
	return gulp.src( config.src )
	.pipe( plumber( {
		errorHandler: onError
		} ) )
	.pipe( s )
	.pipe( sg )
	.pipe( sourcemaps.init( ) )
	.pipe( jshint( ) )
	.pipe( jshint.reporter( 'jshint-stylish' ) )
	.pipe( jshint.reporter( 'fail' ) )
	.pipe( concat( config.name ) )
	.pipe( uglify( ) )
	.pipe( rename( {
		suffix: '.min'
	} ) )
	.pipe( sourcemaps.write( config.srcMapDest ) )
	.pipe( gulp.dest( config.dest ) )
	.pipe( notify( {
		title: config.notify.sucess.title,
		message: function( ) {
			return config.notify.sucess.message + ' ' + general.totalSizeMessage + ' ' + s.prettySize + ' ' + general.gzipMessage + ' ' + sg.prettySize;
		},
		onLast: true
	} ) );
} );
