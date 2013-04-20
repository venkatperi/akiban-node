module.exports = function ( grunt ) {
  'use strict';

  // Project configuration.
  grunt.initConfig( {
    jasmine : {
//      src : 'src/main/**/*.js',
      options : {
        specs : 'src/spec/**/*.js'
      }
    },

    jshint : {
      all : [
        'Gruntfile.js',
        'src/**/*.js'
      ],
      options : {
        jshintrc : '.jshintrc'
      }
    }
  } );

  grunt.loadNpmTasks( 'grunt-contrib-jasmine' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );

  grunt.registerTask( 'test', ['jshint', 'jasmine'] );

  grunt.registerTask( 'default', ['test'] );

};