module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    clean:
      jison: ["tldr-parser.js"]

    exec:
      jison: 'jison tldr.yy tldr.l -o tldr-parser.js'

    watch:
      jison:
        files: [
          '*.l'
          '*.yy'
        ]
        tasks: ['exec:jison']

    grunt.registerTask 'default', ['clean', 'exec:jison']
    grunt.registerTask 'dev', ['default', 'watch']
    grunt.registerTask 'asm', ->
    grunt.loadNpmTasks lib for lib in gruntLibs

gruntLibs = [
  'grunt-contrib-clean'
  'grunt-contrib-watch'
  'grunt-exec'
]
