var gulp         = require( 'gulp' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	concat       = require( 'gulp-concat' ),
	minifycss    = require( 'gulp-minify-css' ),
	csscomb      = require( 'gulp-csscomb' ), // Settings in file .csscomb.json
	notify       = require( 'gulp-notify' ),
	plumber      = require( 'gulp-plumber' ),
	sourcemaps   = require( 'gulp-sourcemaps' ),
// Load config file
	config = require( '../gulp-tasks/config' ).styles,
	size   = config.size;


gulp.task('styles', function() {
	return gulp.src( config.src )
	.pipe( plumber( {
		errorHandler: config.notifyOnError
		} ) )
	.pipe( size.s )
	.pipe( size.sg )
	.pipe( sourcemaps.init( ) )
	.pipe( autoprefixer( config.autoprefixer ) )
	.pipe( concat( config.name ) )
	.pipe( csscomb( ) )
	.pipe( minifycss( config.minifycss ) )
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
