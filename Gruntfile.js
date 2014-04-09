// Generated on 2013-07-24 using generator-angular 0.3.0
'use strict';
//var LIVERELOAD_PORT = 35729;
//var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    shell: {
      options: { stdout: true, stderr: true, failOnError: true },
      remove_coverage: {
        options: {failOnError: false },
        command: 'rm -fR ./coverage/*'
      },
      copy_coverage: {
        options: {failOnError: false },
        command: 'cp -fR ./coverage/Chrome* ./coverage/coverage'
      }
    },
    jslinker: {
      default: {
        options: {
          target: 'app/index.html',
          start_tag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->',
          end_tag: '<!-- endbuild -->',
          relative_to: 'app/',
          exclude: ['app/scripts/**/specs/**.js', 'app/scripts/core/http_mocks/**.js']
        },
        src: ['app/scripts/**/module.js', 'app/scripts/**/**.js', 'app/scripts/*.js']
      },
      testing: {
        options: {
          target: 'app/index.html',
          start_tag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->',
          end_tag: '<!-- endbuild -->',
          relative_to: 'app/',
          exclude: ['app/scripts/**/specs/**.js', 'app/scripts/core/http_mocks/e2e.js']
        },
        src: ['app/scripts/**/*module.js', 'app/scripts/**/**.js', 'app/scripts/*.js',
          'app/bower_components/angular-mocks/angular-mocks.js']
      },
      e2e: {
        options: {
          target: 'app/index.html',
          start_tag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->',
          end_tag: '<!-- endbuild -->',
          relative_to: 'app/',
          exclude: ['app/scripts/**/specs/**.js', 'app/scripts/core/http_mocks/all_calls.js']
        },
        src: ['app/scripts/**/module.js', 'app/scripts/**/**.js', 'app/scripts/*.js',
          'app/bower_components/angular-mocks/angular-mocks.js']
      },
    },
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      recess: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['recess:dist']
      },
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: './.jshintrc',
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/{,**/}**.js'
      ]
    },
    recess: {
      options: {
          compile: true
        },
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/styles',
            src: 'main.less',
            dest: '.tmp/styles/',
            ext: '.css'
          }]
        }
      },
      concat: {
        dist: {
          files: {
            '<%= yeoman.dist %>/scripts/scripts.js': [
              '.tmp/scripts/{,*/}*.js',
              '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
          }
        }
      },
      rev: {
        dist: {
          files: {
            src: [
              '<%= yeoman.dist %>/scripts/{,*/}*.js',
              '<%= yeoman.dist %>/styles/{,*/}*.css',
              '<%= yeoman.dist %>/components/ace_template/css/{,*/}*.css',
              '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
          }
        }
      },
      useminPrepare: {
        html: '<%= yeoman.app %>/index.html',
        options: {
          dest: '<%= yeoman.dist %>',
          flow: {
            steps: {'js': ['concat'], 'css' : ['concat', 'cssmin']},
            post: {}
          }
        }
      },
      usemin: {
        html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/scripts/**/views/**.html' ],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/components/ace_template/css/{,*/}*.css'],
        js: ['<%= yeoman.dist %>/scripts/*.js'],
        options: {
          assetsDirs: ['<%= yeoman.dist %>'],
          patterns: {
            js: [
              [/(images\/success\.png)/gm, 'Replacing reference to success.png'],
              [/(images\/warning\.png)/gm, 'Replacing reference to warning.png'],
              [/(images\/spinnerColegios\.png)/gm, 'Replacing reference to spinnerColegios.png'],
            ]
          }
        }
      },
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/images'
          }]
        }
      },
      cssmin: {
        // By default, your `index.html` <!-- Usemin Block --> will take care of
        // minification. This option is pre-configured if you do not wish to use
        // Usemin blocks.
        dist: {
          files: {
            '<%= yeoman.dist %>/styles/main.css': [
              '.tmp/styles/{,*/}*.css',
              '<%= yeoman.app %>/styles/{,*/}*.css'
            ]
          }
        }
      },
      htmlmin: {
        dist: {
          options: {
            /*removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            //collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true*/
          },
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>',
            src: ['*.html', 'views/*.html', 'views/**/**.html', 'scripts/**/views/**.html'  ],
            dest: '<%= yeoman.dist %>'
          }]
        }
      },
      // Put files not handled in other tasks here
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              //'bower_components/**/*',
              'images/{,*/}*.{gif,webp,svg}',
              'html_images/*',
              'fonts/*',
              'components/ace_template/font/*'
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: [
              'generated/*'
            ]
          }]
        }
      },
      concurrent: {
        server: [
          'recess'
        ],
        test: [
          //'recess'
        ],
        dist: [
          'recess',
          'imagemin',
          'htmlmin'
        ]
      },
      karma: {
        dev: {
          configFile: 'karma.conf.js',
          singleRun: true
        },
        ci: {
          configFile: 'karma-ci.conf.js',
          singleRun: true
        },
        e2e: {
          configFile: 'karma-e2e.conf.js',
          singleRun: true
        }
      },
      cdnify: {
        dist: {
          html: ['<%= yeoman.dist %>/*.html']
        }
      },
      ngmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.dist %>/scripts',
            src: 'scripts.js',
            dest: '<%= yeoman.dist %>/scripts'
          }]
        }
      },
      uglify: {
        options: {
          //mangle: false
        },
        dist: {
          files: {
            '<%= yeoman.dist %>/scripts/scripts.js': [
              '<%= yeoman.dist %>/scripts/scripts.js'
            ],
            '<%= yeoman.dist %>/scripts/modules.js': [
              '<%= yeoman.dist %>/scripts/modules.js'
            ],
            '<%= yeoman.dist %>/scripts/plugins.js': [
              '<%= yeoman.dist %>/scripts/plugins.js'
            ]
          }
        }
      }
    });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'jslinker:testing',
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'karma:dev'
  ]);

  grunt.registerTask('test_ci', [
    'jshint',
    'clean:server',
    'concurrent:test',
    'connect:test',
    'shell:remove_coverage',
    'karma:ci',
    'shell:copy_coverage'
  ]);

  grunt.registerTask('build', [
    'jslinker:default',
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'copy',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);
};
