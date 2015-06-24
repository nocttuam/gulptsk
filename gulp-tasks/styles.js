var gulp         = require( 'gulp' );
var autoprefixer = require( 'gulp-autoprefixer' );
var concat       = require( 'gulp-concat' );
var minifycss    = require( 'gulp-minify-css' );
var csscomb      = require( 'gulp-csscomb' ); // Settings in file .csscomb.js
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var size         = require( 'gulp-size' );
var sourcemaps   = require( 'gulp-sourcemaps' );

// Load config file
var config       = require( '../gulp-tasks/config' );

var onError = function(err) {
	notify.onError( config.styles.notify.error )( err );
	this.emit('end');
};


gulp.task('styles', function() {
	var s = size( );
	var sg = size( { gzip: true } );
	return gulp.src( config.styles.src )
	.pipe( plumber( {
		errorHandler: onError
		} ) )
	.pipe( s )
	.pipe( sg )
	.pipe( sourcemaps.init( ) )
	.pipe( autoprefixer( config.autoprefixer ) )
	.pipe( concat( config.styles.name ) )
	.pipe( csscomb( ) )
	.pipe( minifycss( config.minifycss ) )
	.pipe( sourcemaps.write( config.styles.srcMapDest ) )
	.pipe( gulp.dest( config.styles.dest ) )
	.pipe( notify( {
		title: config.styles.notify.sucess.title,
		message: function( ) {
			return config.styles.notify.sucess.message + ' ' + config.general.totalSizeMessage + ' ' + s.prettySize + ' ' + config.general.gzipMessage + ' ' + sg.prettySize;
		},
		onLast: true
	} ) );
} );
