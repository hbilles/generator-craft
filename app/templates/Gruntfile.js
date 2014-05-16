/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      scripts: {
        src: ['public/ui/js/*.js', 'public/ui/js/vendor/*.js', 'public/ui/js/plugins/*.js', 'public/ui/js/variables/*.js', 'public/ui/js/snippets/*.js']
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'public/ui/js',
          mainConfigFile: 'public/ui/js/config.js',
          name: 'config',
          out: 'public/ui/js/build/config.js'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/ui/css/styles.css': 'public/ui/_scss/styles.scss',
          'public/ui/css/offline.css': 'public/ui/_scss/offline.scss',
          'public/ui/css/ie.css': 'public/ui/_scss/ie.scss'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: ['public/ui/js/*.js', 'public/ui/js/vendor/*.js', 'public/ui/js/plugins/*.js', 'public/ui/js/variables/*.js', 'public/ui/js/snippets/*.js'],
        tasks: ['requirejs'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['public/ui/_scss/*.scss', 'public/ui/_scss/config/*.scss', 'public/ui/_scss/base/*.scss', 'public/ui/_scss/modules/*.scss'],
        tasks: ['compass'],
        options: {
          livereload: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'requirejs', 'sass']);

};
