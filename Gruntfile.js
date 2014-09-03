module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            demo: {
                options: {
                    open: true,
                    hostname: '127.0.0.1',
                    keepalive: true
                }
            }
        },
        'gh-pages': {
            options: {
                clone: 'bower_components/select-box'
            },
            src: [
                'bower_components/**/*',
                '!bower_components/select-box/**/*',
                'demo/*', 'src/*', 'index.html'
            ]
        },
        gitcommit: {
            task: {
                options: {
                    message: 'Update dist',
                    noStatus: true
                },
                files: {
                    src: ['dist']
                }
            }
        },
        replace: {
            example: {
                src: ['src/*'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        },
        bump: {
            options: {
                files: ['bower.json'],
                commitFiles: ['bower.json'],
                pushTo: 'origin',
            }
        },
        shell: {
            register: {
                command: 'bower register select-box git://github.com/ionelmc/polymer-select-box.git'
            },
            info: {
                command: 'bower info select-box'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('register', ['shell:register']);
    grunt.registerTask('release', ['build', 'gitcommit', 'deploy', 'bump', 'shell:info']);
};
