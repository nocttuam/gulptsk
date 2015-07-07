var app             = '',
	src             = '',
	messageError    = 'Erro: <%= error.message %>',
	messageSound    = 'Beep',
	server          = 'http://my.localhost/',
	rsyncDest       = '/path/to/my/remote/project/folder',
// Load Default plugins
	gutil  = require( 'gulp-util' ),
	notify = require( 'gulp-notify' ),
	size   = require( 'gulp-size' );

module.exports = {
	browserSync: {
		options: {
			files:
				[
					app + '/**/*.html',
					app + '/**/*.php',
					app + '/**/*.js',
					app + '/**/*.css',
					app + '/**/*.+(png|jpg|jpeg|gif|ico)'
				],
			proxy: server,
			// port: 1000,
			// reloadOnRestart: true, // Default: false
			notify: true,
			reloadDelay: 500, // Default: 0
			// injectChanges: false,  // Default: true
			open: false, // Default: true(options: local, external, ui, ui-external, tunnel or false)
			logLevel: 'info' // "info", "debug", "warn", or "silent"
		}
	},
	default: {
		notification: function( ){
			notify( {
				title: 'Default Task',
				message: 'Default Task Finished',
				onLast: true
			} );
		}
	},
	ftp: {
		src: app + '/**/*',
		dest: '',
		options: {
			host: '',
			user: '',
			pass: '',
			parallel: 4,
			maxConnections: 4,
			log: gutil.log
		}
	},
	images: {
		src: [
			src + '/images/**/*.+(png|jpg|jpeg|gif|ico)'
		],
		dest: app + '/images',
		imagemin: {
			progressive: true,
			optimizationLevel: 4,
			interlaced: true
		},
		notifyError: function( err ) {
			notify.onError( {
				title: 'Images',
				subtitle: 'Images Task Fail!',
				message: messageError,
				sound: messageSound
			} )( err );
			this.emit( 'end' );
		},
		notifyOnSucess: {
			title: 'Images',
			message: 'Images Task Success!'
		}
	},
	rsync: {
		src: app + '/**/*',
		options: {
			incremental: true,
			progress: true,
			root: app,
			destination: rsyncDest
		},
		notifyError: function( err ) {
			notify.onError( {
				title: 'Local Sync',
				subtitle: 'Sync Fail!',
				message: messageError,
				sound: messageSound
			} )( err );
			this.emit( 'end' );
		},
		notifyOnSucess: {
			title: 'Local Sync',
			message: 'Sync Sucess!'
		}
	},
	size: {
		totalSizeMessage: 'Total files:',
		gzipMessage: 'Gzip files:',
		s: size( ), // Required to display size files
		sg: size( { gzip: true } ) // Required to display gizped size files
	},
	scripts: {
		name: 'main.js',
		src: [
			src + '/js/**/*.js'
		],
		dest: app + '/js',
		srcMapDest: '.',
		notifyOnError: function ( err ) {
			notify.onError( {
				title: 'Scripts',
				subtitle: 'Script Task Fail!',
				message: messageError,
				sound: messageSound
			} )( err );
			this.emit('end');
		},
		notifyOnSucess: {
			title: 'Scripts',
			message: 'Script Task Sucess!'
		}
	},
	styles: {
		name: 'main.css',
		src: [
			src + '/css/**/*.css'
		],
		dest: app + '/css',
		srcMapDest: '.',
		autoprefixer: {
			browser: [
				'> 1%',
				'last 4 versions'
				],
			cascade: true
		},
		minifycss: {
			keepBreaks: true,
			keepSpecialComments: 1,
			processImport: false
		},
		notifyOnError: function ( err ) {
			notify.onError( {
				title: 'Styles',
				subtitle: 'Styles Fail!',
				message: messageError,
				sound: messageSound
			} )( err );
			this.emit( 'end' );
		},
		notifyOnSucess: {
			title: 'Styles',
			message: 'Styles Sucess!'
		}
	},
	stylus: {
		src: [
			src + '/styl/**/*.styl'
		],
		dest: src + '/css',
		notifyOnError: function ( err ) {
			notify.onError( {
				title: 'Stylus',
				subtitle: 'Stylus  Fail!',
				message: messageError,
				sound: messageSound
			} )( err );
			this.emit( 'end' );
		},
		notifyOnSucess: {
			title: 'Stylus',
			message: 'Styluss Sucess!'
		}
	}
};
