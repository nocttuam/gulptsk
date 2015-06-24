// Load required modules
var gulp   = require( 'gulp' );
var stylus = require( 'gulp-stylus' );

// Load config file
var config = require( '../gulp-tasks/config' );


var onError = function(err) {
	notify.onError( config.stylus.notify.error )( err );
	this.emit('end');
};


gulp.task('stylus', function () {
	var s = size( );
	var sg = size( { gzip: true } );
	return gulp.src( config.stylus.src )
	.pipe( plumber( {
		errorHandler: onError
	} ) )
	.pipe( s )
	.pipe( sg )
	.pipe( stylus( {
		// linenos: true
	} ) )
	.pipe(gulp.dest( config.stylus.dest ) )
	.pipe( notify( {
		title: config.stylus.notify.sucess.title,
		message: function( ) {
			return config.stylus.notify.sucess.message + ' ' + config.general.totalSizeMessage + ' ' + s.prettySize + ' ' + config.general.gzipMessage + ' ' + sg.prettySize;
		},
		onLast: true
	} ) );
});
