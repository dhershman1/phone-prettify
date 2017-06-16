import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';

export default {
	entry: 'index.js',
	moduleName: 'phonePrettify',
	format: 'umd',
	plugins: [
		buble(),
		uglify()
	],
	dest: 'dist/phone-prettify.umd.js'
};
