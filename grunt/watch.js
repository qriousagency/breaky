module.exports = {
	watch: {
		files: ['*.js', '!*-min.js'],
		tasks: ['uglify']
	}
}