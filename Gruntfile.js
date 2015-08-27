module.exports = function(grunt) {

  // Tasks are configured in partials located in grunt/
  require('load-grunt-config')(grunt);


  grunt.registerTask('default', ['watch']);


};