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
			// we'll have to change the separator to ';' once we use uglify
			options: { separator: '\n\n' },
			dist: {
				src: ['_/components/js/*.js'],
				dest: '_/js/<%= pkg.name %>.js'
				}
		}, // concat

		// not necessary yet
		// uglify: {
		// 	options: { banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n' },
		// 	dist: { files: { '_/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] } }
		// }, // uglify

		sass: {
			options: { trace: true, style: 'expanded' },
			dist: {
				files: {'_/css/main.css' : '_/components/sass/main.scss'}
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
				tasks: ['jshint', 'concat']
			}, // watch jshint
			sass: {
				files: ['_/components/sass/*.scss'],
				tasks: ['sass']
	      		}, // watch sass
      		} // watch
	});

	//register tasks
	// grunt.registerTask('test', ['jshint','qunit']);
	grunt.registerTask('default', ['watch','jshint', 'concat', 'sass']);
};