module.exports = function (grunt) {
    'use strict';

    var config = {
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                sourceMap: false,
                presets: ['react']
            },
            dist: {
                files: {
                    "temp/form.temp.js": ["src/js/form.js"],
                    "temp/app.temp.js": ["src/js/app.js"]
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    "dist/form.min.js": ["temp/form.temp.js"],
                    "src/js/app.min.js": ["temp/app.temp.js"]
                }
            }
        },

        copy: {
            files: {
                files: {
                    "src/js/form.min.js": ["dist/form.min.js"]
                }
            }
        },

        clean: {
            build: ['temp']
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask("default",["babel:dist","uglify:dist","copy:files","clean"]);
};
