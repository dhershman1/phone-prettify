import buble from 'rollup-plugin-buble';
// import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/index.js',
	name: 'phonePrettify',
	output: {
		format: 'umd',
		file: 'dist/phone-prettify.umd.js'
	},
	plugins: [
		buble()
	]
};
