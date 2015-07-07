// Load required modules
var gulp       = require( 'gulp' ),
	concat     = require( 'gulp-concat' ),
	jshint     = require( 'gulp-jshint' ),
	notify     = require( 'gulp-notify' ),
	plumber    = require( 'gulp-plumber' ),
	rename     = require( 'gulp-rename' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	uglify     = require( 'gulp-uglify' ),
// Load config file
	config = require( '../gulp-tasks/config' ).scripts,
	size   = require( '../gulp-tasks/config' ).size;

gulp.task( 'scripts', function() {
	return gulp.src( config.src )
	.pipe( plumber( {
		errorHandler: config.notifyOnError
		} ) )
	.pipe( size.s )
	.pipe( size.sg )
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
		title: config.notifyOnSucess.title,
		message: function( ) {
			return config.notifyOnSucess.message + ' ' + size.totalSizeMessage + ' ' + size.s.prettySize + ' ' + size.gzipMessage + ' ' + size.sg.prettySize;
		},
		onLast: true
	} ) );
} );
