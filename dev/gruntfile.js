// gruntfile template largely borrowed from Raasch (Programming JavaScript, 2013)
module.exports = function(grunt) {

	//dependencies
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// init
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: { separator: ';' },
			dist: {
				src: ['_/components/js/*.js'],
				dest: '_/js/<%= pkg.name %>.js'
				}
		}, // concat
		uglify: {
			options: { banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n' },
			dist: { files: { '_/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] } }
		}, // uglify
		sass: {
			options: { separator: ';' },
			dist: {
				files: [{
					expand: true,
					cwd: '_/components/sass',
					src: ['*.scss'],
					dest: '_/css',
					ext: '.css'
				}]
			}
		}, // sass
		jshint: {
			files: ['_/components/js/*.js', '!_/js/lib/*.js'],
			options: {
				globals: {
				jQuery: true,
				console: true,
				module: true,
				document: true,
				}
			}
		}, // jshint
		watch: {
			jshint: {
				options: { livereload: true },
				files: ['<%= jshint.files %>', '*.html'],
				tasks: ['jshint']
			}, // watch jshint
			sass: {
				files: ['_/components/sass/*.scss'],
				tasks: ['compass:dev']
	      		}, // watch sass
      		} // watch
	});

	//register tasks
	// grunt.registerTask('test', ['jshint','qunit']);
	grunt.registerTask('default', ['watch','jshint', 'concat', 'uglify', 'sass']);
};