// Load required modules
var gulp    = require( 'gulp' ),
	stylus  = require( 'gulp-stylus' ),
	notify  = require( 'gulp-notify' ),
	plumber = require( 'gulp-plumber' ),
// Load config file
	config = require( '../gulp-tasks/config' ).stylus,
	size   = config.size;

gulp.task('stylus', function () {
	return gulp.src( config.src )
	.pipe( plumber( {
		errorHandler: config.notifyOnError
	} ) )
	.pipe( size.s )
	.pipe( size.sg )
	.pipe( stylus( {
		// linenos: true // Set linenos
		'include css': true // Include css
	} ) )
	.pipe(gulp.dest( config.dest ) )
	.pipe( notify( {
		title: config.notifyOnSucess.title,
		message: function( ) {
			return config.notifyOnSucess.message + ' ' + size.totalSizeMessage + ' ' + size.s.prettySize + ' ' + size.gzipMessage + ' ' + size.sg.prettySize;
		},
		onLast: true
	} ) );
} );
