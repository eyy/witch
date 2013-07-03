module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'dist/witch.min.js': ['dist/witch.js'],
                    'dist/witch-dep.min.js': [
                        'example/components/watch/index.js',
                        'example/components/rivets/dist/rivets.js',
                        'dist/witch.js'
                    ]
                }
            }
        },

        compress: {
          main: {
            options: {
              mode: 'gzip'
            },
            expand: true,
            cwd: 'dist/',
            src: ['*.min.js'],
            dest: 'dist/'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['uglify', 'compress']);
};