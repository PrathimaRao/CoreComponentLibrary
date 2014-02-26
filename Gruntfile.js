var localpath = "C:\\cdn_nonprod\\qa3";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },

            my_target: {
                options: {
                    beautify: true
                },
                files: {
                    'dest/js/demo-min.js': [
                       'src/Packages.js'
                       , ' src/com/art/demo/DemoCore.js'
                       , ' src/com/art/demo/commands/socialFeedCommands.js'
                       , ' src/com/art/demo/model/Config.js'
                       , ' src/com/art/demo/model/DAL.js'                      
                       , ' src/com/art/demo/model/model.js'
                       , ' src/com/art/demo/modules/socialFeedModule.js'
                       , ' src/com/art/demo/view/feedView.js'
                       , ' src/startup.js'
                       , ' src/com/art/demo/utils.js'                                                                
                      ]  
                }
            }
        },
        cssmin: {
          add_banner: {
            options: {
              banner: '/* My minified css file */'
            },
            files: {
              'dest/css/gigya.css': ['src-css/**/*.css']
            }
          }
        },
        qunit: {
            files: ['funcunit/**/funcUnit.html']
        },
        clean: {
            build: {
                src: ["dest/*.js"]
            }
        },
        copy: {
            main: {
                files: [
                // includes files within path                  
                {expand: true, flatten: true, src: ['src/com/art/demo/modules/*.html'], dest: 'dest/modules/', filter: 'isFile' },
                {expand: true, flatten: true, src: ['dest/**/'], dest: localpath,filter: 'isFile'}
             ]
            }
        },       
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //To execute
    //1. Jshint(to validate js)
    //2. Execute test cases with qunit (to execute customized test cases)
    //3. Uglify at last (to generate minified files after all validations)
    //grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);
    //cmd "grunt minify"
    grunt.registerTask('minify', ['uglify','cssmin','copy']);

    //cmd "grunt all"
    grunt.registerTask('all', ['jshint', 'qunit', 'uglify']);

    //cmd "grunt validateonly"
    grunt.registerTask('validateonly', ['jshint']);

    //cmd "grunt" (default one)
    grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);
    

    grunt.registerTask('delete', ['clean']);
    
    grunt.registerTask('deploy', ['copy']);
};