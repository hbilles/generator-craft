'use strict';
var util = require('util');
var path = require('path');
var curl = require('curlrequest');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');

var craftVersionMinor = '1.3',
    craftVersion = craftVersionMinor + '.2462',
    craftZipFile = 'Craft-' + craftVersion + '.zip';


var CraftGenerator = module.exports = function CraftGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CraftGenerator, yeoman.generators.Base);

CraftGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'craftName',
      message: 'What is the name of this website? (normal name with spaces and capitalization)'
    },
    {
      name: 'craftDomainName',
      message: 'What is the root domain name for this website? (no TLD extension)'
    },
    {
      name: 'craftProductionTLD',
      message: 'What is the TLD extension for the production website?',
      default: 'com'
    },
    {
      name: 'craftStaging',
      message: 'What is the staging domain for this website?',
      default: 'line58.com'
    },
    {
      name: 'craftVersion',
      message: 'What is the current version of Craft?',
      default: craftVersion
    }
  ];

  this.prompt(prompts, function (props) {
    this.craftName = props.craftName;
    this.craftDomainName = props.craftDomainName;
    this.craftProductionTLD = props.craftProductionTLD;
    this.craftStaging = props.craftStaging;
    this.craftVersion = props.craftVersion;

    craftVersion = this.craftVersion;

    var versionArray = craftVersion.split('.');
    craftVersionMinor = versionArray[0] + '.' + versionArray[1];
    craftZipFile = 'Craft-' + craftVersion + '.zip';

    cb();
  }.bind(this));
};

CraftGenerator.prototype.getCraft = function getCraft() {
  var cb = this.async();

  var options = {
    url: 'http://download.buildwithcraft.com/craft/' + craftVersionMinor + '/' + craftVersion + '/' + craftZipFile,
    verbose: true,
    encoding: null,
    'remote-name': true
  };

  console.log('Downloading Craft CMS zip archive...');

  curl.request(options, function (err, file) {

    console.log('About to unzip Craft...');

    var unzip = spawn('unzip', [craftZipFile]);

    unzip.stdout.on('data', function (data) {
      console.log(data);
    });

    unzip.stderr.on('data', function (data) {
      console.log('Unzipping Craft Error: ' + data);
    });

    unzip.on('close', function (code) {
      if (code !== 0) {
        console.log('Unzipping Craft exited with code ' + code);
      }

      cb();
    });
  });

};

CraftGenerator.prototype.cleanupCraft = function cleanupCraft() {
  var cb = this.async();

  console.log('Cleaning up after unzipping Craft...');

  var cleanup = spawn('rm', ['-rf', craftZipFile, 'craft/templates/_layout.html', 'craft/templates/news']);

  cleanup.stderr.on('data', function (data) {
    console.log('Cleanup error: ' + data);
  });

  cb();
}

CraftGenerator.prototype.app = function app() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('bowerrc', '.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  
  this.template('_package.json', 'package.json');
  
  /* Bower seems to be more trouble than it's worth for now.
   * Pulling down the entire code repo for each dependency,
   * then having to delete extra code manually so as to not
   * push it all up to staging or production seems sub-optimal.
   * This generator will keep the specific file dependencies
   * in the generator repo and move them in place instead.
   */
  //this.template('_bower.json', 'bower.json');
};

CraftGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_db.php', 'craft/config/db.php');
  this.template('_general.php', 'craft/config/general.php');

  this.copy('htaccess', 'public/.htaccess');
  this.mkdir('public/images/cache');
  this.directory('ui', 'public/ui');

  this.directory('templates', 'craft/templates');
};
