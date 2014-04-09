'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: './.jshintrc',
      },
      all: [
        'Gruntfile.js',
        'math_utils/{,**/}**.js'
      ]
    },
    // Put files not handled in other tasks here
    karma: {
      dev: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
    },
  });


  grunt.registerTask('test', [
    'karma:dev'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);
};
