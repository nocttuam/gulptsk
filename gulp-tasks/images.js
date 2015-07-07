// Load plugins
var gulp     = require( 'gulp' ),
	changed  = require( 'gulp-changed' ),
	chmod    = require( 'gulp-chmod' ),
	imagemin = require( 'gulp-imagemin' ),
	notify   = require( 'gulp-notify' ),
	plumber  = require( 'gulp-plumber' ),
// Load config file
	config = require( '../gulp-tasks/config' ).images,
	size   = require( '../gulp-tasks/config' ).size;

gulp.task( 'images', function() {
	return gulp.src( config.src )
	.pipe( plumber( {
		errorHandler: config.onError
		} ) )
	.pipe( size.s )
	.pipe( size.sg )
	.pipe( changed( config.dest ) )
	.pipe( imagemin( config.imagemin ) )
	.pipe( chmod( 644 ) )
	.pipe( gulp.dest( config.dest ) )
	.pipe( notify( {
		title: config.notifyOnSucess.title,
		message: function( ) {
			return config.notifyOnSucess.message + ' ' +  size.totalSizeMessage + ' ' + size.s.prettySize + ' ' + size.gzipMessage + ' ' + size.sg.prettySize;
		},
		onLast: true
	} ) );
} );
