'use strict';
var yeoman = require('yeoman-generator'),
	chalk  = require('chalk'),
	yosay  = require('yosay'),
	curl   = require('curlrequest'),
	mkdirp = require('mkdirp'),
	spawn  = require('child_process').spawn;

var craftVersionMinor = '2.5',
	craftVersion      = craftVersionMinor + '.2752',
	craftZipFile      = 'Craft-' + craftVersion + '.zip',
	parsedownUnzipped = 'Parsedown-master',
	parsedownFolder   = parsedownUnzipped + '/parsedown',
	parsedownZipFile  = 'master.zip';


module.exports = yeoman.generators.Base.extend({
	initializing: function() {
		this.pkg = require('../package.json');
	},

	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.bold.underline('Craft CMS') + ' generator!'
		));

		var prompts = [
			{
				type: 'input',
				name: 'siteName',
				message: 'What is the ' + chalk.underline('name') + ' of this website? (normal name with spaces and capitalization)'
			},
			{
				type: 'input',
				name: 'domainName',
				message: 'What is the ' + chalk.underline('root domain name') + ' for this website? (no TLD extension)'
			},
			{
				type: 'input',
				name: 'productionTLD',
				message: 'What is the ' + chalk.underline('TLD') + ' for the production website?',
				default: 'com'
			},
			{
				type: 'input',
				name: 'stagingDomain',
				message: 'What is the ' + chalk.underline('staging domain') + ' for this website?',
				default: 'line58.com'
			},
			{
				type: 'input',
				name: 'craftVersion',
				message: 'What is the ' + chalk.underline('current version of Craft') + '?',
				default: craftVersion
			}
		];

		this.prompt(prompts, function(props) {
			this.props = props;
			// To access props later use this.props.someOption;

			craftVersion = props.craftVersion;

			var versionArray = craftVersion.split('.');
			craftVersionMinor = versionArray[0] + '.' + versionArray[1];
			craftZipFile = 'Craft-' + craftVersion + '.zip';
		
			done();
		}.bind(this));
	},

	downloading: function() {
		var done = this.async();

		var options = {
			url: 'http://download.buildwithcraft.com/craft/' + craftVersionMinor + '/' + craftVersion + '/' + craftZipFile,
			verbose: true,
			encoding: null,
			'remote-name': true
		};

		this.log('Downloading Craft CMS zip archive...');

		curl.request(options, function (err, file) {

			console.log('About to unzip Craft...');

			var unzip = spawn('unzip', [craftZipFile]);

			unzip.stdout.on('data', function (data) {
				console.log('Unzipping!');
			});

			unzip.stderr.on('data', function (data) {
				console.log(chalk.red('Unzipping Craft Error: ') + data);
			});

			unzip.on('close', function (code) {
				if (code !== 0) {
					console.log('Unzipping Craft exited with code ' + code);
				} else {
					console.log('Finished unzipping Craft!');
				}

				done();
			});
		});
	},

	downloadingParsedown: function() {
		var done = this.async();

		var options = {
			url: 'https://github.com/pixelandtonic/Parsedown/archive/master.zip',
			verbose: true,
			encoding: null,
			'remote-name': true
		};

		this.log('Downloading Parsedown plugin zip archive...');

		curl.request(options, function (err, file) {

			console.log('About to unzip Parsedown...');

			var unzip = spawn('unzip', [parsedownZipFile]);

			unzip.stdout.on('data', function (data) {
				console.log('Unzipping!');
			});

			unzip.stderr.on('data', function (data) {
				console.log(chalk.red('Unzipping Parsedown Error: ') + data);
			});

			unzip.on('close', function (code) {
				if (code !== 0) {
					console.log('Unzipping Parsedown exited with code ' + code);
				} else {
					console.log('Finished unzipping Parsedown!');
				}

				done();
			});
		});
	},

	copyingParsedown: function() {
		var done = this.async();

		this.log('Copying Parsedown to plugin folder...');

		var copying = spawn('cp', ['-r',
			parsedownFolder,
			'craft/plugins'
			]);

		copying.stderr.on('data', function (data) {
			this.log(chalk.red('Copying Parsedown error: ') + data);
		}.bind(this));

		copying.on('close', function (code) {
			if (code !== 0) {
				console.log('Copying Parsedown exited with code ' + code);
			} else {
				console.log('Finished copying Parsedown!');
			}

			done();
		});
	},

	cleaning: function() {
		var done = this.async();

		this.log('Cleaning up...');

		var cleanup = spawn('rm', ['-rf',
			craftZipFile,
			'craft/templates',
			'craft/config/general.php',
			'craft/config/db.php',
			'craft/web.config',
			'public/web.config',
			'public/htaccess',
			parsedownZipFile,
			parsedownUnzipped
			]);

		cleanup.stderr.on('data', function (data) {
			this.log(chalk.red('Cleanup error: ') + data);
		}.bind(this));

		done();
	},

	writing: {
		app: function() {
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);

			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);

			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);

			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					domainName: this.props.domainName,
					siteName: this.props.siteName
				}
			);

			this.fs.copyTpl(
				this.templatePath('_gulpfile.js'),
				this.destinationPath('gulpfile.js'),
				{
					domainName: this.props.domainName
				}
			);
		},

		projectFiles: function() {
			var done = this.async();

			this.fs.copyTpl(
				this.templatePath('_db.php'),
				this.destinationPath('craft/config/db.php'),
				{
					domainName: this.props.domainName,
					stagingDomain: this.props.stagingDomain,
					productionTLD: this.props.productionTLD
				}
			);

			this.fs.copyTpl(
				this.templatePath('_general.php'),
				this.destinationPath('craft/config/general.php'),
				{
					domainName: this.props.domainName,
					stagingDomain: this.props.stagingDomain,
					productionTLD: this.props.productionTLD
				}
			);

			this.fs.copy(
				this.templatePath('htaccess'),
				this.destinationPath('public/.htaccess')
			);

			this.directory('ui', 'public/ui');
			mkdirp('public/images/cache', function(err) {
				if (err) {
					console.error(err);
				} else {
					console.log('Created image cache directory.');
				}
			});

			this.directory('templates', 'craft/templates');

			this.directory('src', 'src');

			done();
		}
	},

	install: function() {
		this.installDependencies();
	}
});
