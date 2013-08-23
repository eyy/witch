module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),

        meta: {
            banner:
                '// witch <%= pkg.version %>\n' +
                '// http://witch.io\n' +
                '// license: <%= pkg.license %>\n\n'
        },

        uglify: { all: {
            options: {
                banner: '<%= meta.banner %>',
                report: 'gzip'
            },
            files: {
                'dist/witch.min.js': ['dist/witch.js']
            }
        } }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};