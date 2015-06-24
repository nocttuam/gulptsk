var app             = '';
var src             = '';
var messageError    = 'Erro: <%= error.message %>';
var messageSound    = 'Beep';
var localhost       = 'http://my.localhost/';
var rsyncDest       = '';

// Load plugins
var gutil = require( 'gulp-util' );

module.exports = {
	general: {
		totalSizeMessage: 'Total files:',
		gzipMessage: 'Gzip files:'
	},
	autoprefixer: {
		browser: [
			'> 1%',
			'last 4 versions'
			],
		cascade: true
	},
	browserSync: {
		options: {
			files:
				[
					app + '/**/*.php',
					app + '/**/*.js',
					app + '/**/*.css',
					app + '/**/*.+(png|jpg|jpeg|gif|ico)'
				],
			proxy: localhost,
			// port: 1000,
			// reloadOnRestart: true, // Default: false
			notify: true,
			reloadDelay: 1000, // Default: 0
			// injectChanges: false,  // Default: true
			open: false, // Default: true(options: local, external, ui, ui-external, tunnel or false)
			logLevel: 'info' // "info", "debug", "warn", or "silent"
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
	imagemin: {
		progressive: true,
		optimizationLevel: 4,
		interlaced: true
	},
	minifycss: {
		keepBreaks: true,
		keepSpecialComments: 1,
		processImport: false
	},
	optimages: {
		src: [
			src + '/images/**/*.+(png|jpg|jpeg|gif|ico)'
		],
		dest: app + '/images',
		notify: {
			error: {
				title: 'Images',
				subtitle: 'Optimages Fail!',
				message: messageError,
				sound: messageSound
			},
			sucess: {
				title: 'Images',
				message: 'Optimages Sucess!'
			}
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
		notify: {
			error: {
				title: 'Local Sync',
				subtitle: 'Sync Fail!',
				message: messageError,
				sound: messageSound
			},
			sucess: {
				title: 'Local Sync',
				message: 'Sync Sucess!'
			}
		}
	},
	scripts: {
		name: 'main.js',
		src: [
			src + '/js/**/*.js'
		],
		dest: app + '/js',
		srcMapDest: '.',
		notify: {
			error: {
				title: 'Scripts',
				subtitle: 'Scripts Fail!',
				message: messageError,
				sound: messageSound
			},
			sucess: {
				title: 'Scripts',
				message: 'JavaScript Sucess!'
			}
		}
	},
	styles: {
		name: 'main.css',
		src: [
			src + '/css/**/*.css'
		],
		dest: app + '/css',
		srcMapDest: '.',
		notify: {
			error: {
				title: 'Styles',
				subtitle: 'Styles Fail!',
				message: messageError,
				sound: messageSound
			},
			sucess: {
				title: 'Styles',
				message: 'Styles Sucess!'
			}
		}
	},
	stylus: {
		src: [
			src + '/styl/**/*.styl'
		],
		dest: src + '/css',
		notify: {
			error: {
				title: 'Stylus',
				subtitle: 'Stylus  Fail!',
				message: messageError,
				sound: messageSound
			},
			sucess: {
				title: 'Stylus',
				message: 'Styluss Sucess!'
			}
		}
	}
};