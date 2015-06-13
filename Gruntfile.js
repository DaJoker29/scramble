module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            sass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'uglify:dev']
            },
            templates: {
                files: ['src/templates/**/*.*'],
                tasks: ['copy']
            },
            doc: {
                files: ['public/script.js'],
                tasks: ['jsdoc']
            },
            livereload: {
                options: { livereload: true },
                files: ['public/**/*']
            }
        },
        sass: {
            dev: {
                expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                dest: 'public',
                ext: '.css',
                options: {
                    style: 'expanded'
                }
            },
            prod: {
               expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                dest: 'public',
                ext: '.css',
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                }
            }
        },
        autoprefixer: {
            dev: {
                src: 'public/style.css',
                map: true
            },
            prod: {
                src: 'public/style.css'
            }
        },
        clean: {
            all: ['public/']
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    mangle: false,
                    beautify: true,
                    preserveComments: 'all',
                    compress: false
                },
                files: {
                    'public/script.js': ['src/js/**/*.js']
                }
            },
            prod: {
                files: {
                    'public/script.js': ['src/js/**/*.js']
                }
            }
        },
        copy: {
            templates: {
                cwd: 'src/templates',
                src: ['**/*.*', '!**/_*.*'],
                dest: 'public',
                expand: true
            }
        },
        eslint: {
            target: ['src/js/**/*.js']
        }
    });

    grunt.registerTask('dev', 'Build development version of project', ['clean', 'copy', 'eslint', 'uglify:dev', 'sass:dev', 'autoprefixer:dev']);
    grunt.registerTask('prod', 'Build production version of project', ['clean', 'copy', 'eslint', 'uglify:prod', 'sass:prod', 'autoprefixer:prod']);
    grunt.registerTask('default', 'Build development version and run watch server', ['dev', 'watch']);
};