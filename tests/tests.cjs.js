'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/**
 * @module Phone-Prettify
 */

/**
 * Breaks down our phone number string to a 3 piece object
 * @function breakdownFull
 * @param  {string} phone The uglified phone string
 * @return {object}       Returns the broken down object
 */
const breakdownFull = (phone) => {
	return {
		areaCode: phone.substr(0, 3),
		localCode: phone.substr(3, 3),
		lineNumber: phone.substr(6, 4)
	};
};

/**
* Breaks down our phone number string to a 2 piece object
* @function breakdownShort
* @param  {string} phone The uglified phone string
* @return {object}       Returns the broken down object
*/
const breakdownShort = (phone) => {
	return {
		areaCode: null,
		localCode: phone.substr(0, 3),
		lineNumber: phone.substr(3, 4)
	};
};

/**
 * Breaks down our phone number string to a 4 piece object
 * @function breakdownExtension
 * @param  {string} phone The uglified phone string
 * @return {object}       Returns the broken down object
 */
const breakdownExtension = (phone) => {
	return {
		extension: phone.substr(10),
		areaCode: phone.substr(0, 3),
		localCode: phone.substr(3, 3),
		lineNumber: phone.substr(6, 4)
	};
};

/**
 * Breaks down our phone number string to a 4 piece object
 * @function breakdownLongDistance
 * @param  {string} phone The uglified phone string
 * @return {object}       Returns the broken down object
 */
const breakdownLongDistance = (phone) => {
	return {
		countryCode: phone.substr(0, 1),
		areaCode: phone.substr(1, 3),
		localCode: phone.substr(4, 3),
		lineNumber: phone.substr(7, 4)
	};
};

const uglify = (phone) => {
	return phone.replace(/[a-z]\w+|\W/gi, '');
};

/**
 * Formats the string to a dashed style
 * @function dashed
 * @param  {string} phone Uglified phone string
 * @return {string}       Returns the formatted phone string
 */
const dashed = (phone) => {
	const uglyPhone = uglify(phone);
	const isFull = (uglyPhone.length >= 10);
	const {areaCode, localCode, lineNumber} = (isFull) ? breakdownFull(uglyPhone) : breakdownShort(uglyPhone);

	if (isFull) {
		return (`${areaCode}-${localCode}-${lineNumber}`);
	}

	return (`${localCode}-${lineNumber}`);
};

/**
 * Formats the string to a normal style
 * @function normalize
 * @param  {string} phone Uglified phone string
 * @return {string}       Returns the formatted phone string
 */
const normalize = (phone) => {
	const uglyPhone = uglify(phone);
	const isFull = (uglyPhone.length >= 10);
	const {areaCode, localCode, lineNumber} = (isFull) ? breakdownFull(uglyPhone) : breakdownShort(uglyPhone);

	if (isFull) {
		return (`(${areaCode}) ${localCode}-${lineNumber}`);
	}

	return (`${localCode}-${lineNumber}`);
};

/**
	* Formats the string to a dotted style
	* @function dotted
	* @param  {string} phone Uglified phone string
	* @return {string}       Returns the formatted phone string
	*/
const dotted = (phone) => {
	const uglyPhone = uglify(phone);
	const isFull = (uglyPhone.length >= 10);
	const {areaCode, localCode, lineNumber} = (isFull) ? breakdownFull(uglyPhone) : breakdownShort(uglyPhone);

	if (isFull) {
		return (`${areaCode}.${localCode}.${lineNumber}`);
	}

	return (`${localCode}.${lineNumber}`);
};

const methods = {
	uglify,
	dashed,
	dotted,
	normalize
};

	/**
	* Formats the string to a long distance with a custom format style
	* @function longDistance
	* @param  {string} phone Uglified phone string
	* @param {string} format The desired format for the phone number
	* @return {string}       Returns the formatted phone string
	*/
const longDistance = (phone, format) => {
	const uglyPhone = uglify(phone);
	const {countryCode, areaCode, localCode, lineNumber} = breakdownLongDistance(uglyPhone);
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (format && format !== 'longDistance' && format !== 'extension') {
		formattedPhone = methods[format](mainNumber);
	}

	return (`${countryCode}+${formattedPhone}`);
};

	/**
	* Formats the string to an extension with a custom format style
	* @function extension
	* @param  {string} phone Uglified phone string
	* @param {string} format The desired format for the phone number
	* @return {string}       Returns the formatted phone string
	*/
const extensionNumber = (phone, format) => {
	const uglyPhone = uglify(phone);
	const {extension, areaCode, localCode, lineNumber} = breakdownExtension(uglyPhone);
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (format && format !== 'extension' && format !== 'longDistance') {
		formattedPhone = methods[format](mainNumber);
	}

	return (`${formattedPhone} x ${extension}`);
};

test('Return a uglified phone number', t => {
	let result = uglify('555-444-1111');

	t.equal(result, '5554441111', `Returned uglify format: ${result}`);

	result = uglify('555444-1111');
	t.equal(result, '5554441111', `Returned uglify format: ${result}`);
	t.end();
});

test('Return a dashed format phone number', t => {
	let result = dashed('5554441111');

	t.equal(result, '555-444-1111', `Returned dashed format: ${result}`);
	result = dashed('555.444.1111');

	t.equal(result, '555-444-1111', 'Converted dotted formatting to dashed');
	t.end();
});

test('Return a dotted format phone number', t => {
	let result = dotted('5554441111');

	t.equal(result, '555.444.1111', `Returned dotted format: ${result}`);
	result = dotted('555-444-1111');

	t.equal(result, '555.444.1111', 'Converted dashed to dotted format');
	t.end();
});

test('Return a normal format phone number', t => {
	const result = normalize('5554441111');

	t.equal(result, '(555) 444-1111', `Returned normalize format: ${result}`);
	t.end();
});

test('Return a long distance format', t => {
	const result = longDistance('15554441111', 'dotted');

	t.equal(result, '1+555.444.1111', `Returned longdistance with dotted format: ${result}`);
	t.end();
});

test('Return an extension format', t => {
	const result = extensionNumber('55544411118989', 'dashed');

	t.equal(result, '555-444-1111 x 8989', `Returned extension with dashed format: ${result}`);
	t.end();
});
