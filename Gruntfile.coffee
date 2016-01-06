module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    clean:
      jison: ["tldr-parser.js"]

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
          'specs/**'
        ]
        helpers: [
          'specs/**'
        ]

    exec:
      jison: 'jison tldr.yy tldr.l -o lib/tldr-parser.js'

    watch:
      jison:
        files: [
          '*.l'
          '*.yy'
        ]
        tasks: ['exec:jison']

    grunt.registerTask 'default', ['clean', 'exec:jison']
    grunt.registerTask 'test', 'jasmine_nodejs'
    grunt.registerTask 'dev', ['default', 'watch']
    grunt.loadNpmTasks lib for lib in gruntLibs

gruntLibs = [
  'grunt-contrib-clean'
  'grunt-contrib-watch'
  'grunt-exec'
  'grunt-jasmine-nodejs'
]
