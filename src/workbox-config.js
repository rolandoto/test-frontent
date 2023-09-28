module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{js,css,jsx,svg,png,jpeg}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};