module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    jasmine_nodejs:
      options:
#        specNameSuffix: 'spec.js'
#        helperNameSuffix: 'helper.js'
        useHelpers: yes
        stopOnFailure: no
        reporters:
          console:
            colors: true
            cleanStack: 1
            verbosity: 4
            listStyle: 'indent'
            activity: yes
      specs:
        specs: [
          'specs/**.spec.js'
        ]
        helpers: [
          'specs/tldr-lint-helper.js'
        ]

    grunt.registerTask 'test', 'jasmine_nodejs'
    grunt.loadNpmTasks lib for lib in gruntLibs

gruntLibs = [
  'grunt-jasmine-nodejs'
]
