import _format from './_internals/format/index';
import _uglify from './_internals/uglify/index';
import breakdown from './_internals/breakdown/index';
import isValid from './_internals/isValid/index';

/**
 * @module Phone-Prettify
 */

export const uglify = _uglify;

export const format = _format;

export const groupTwo = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	if (phone.length === 8) {
		return _uglify(phone).replace(/^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1 $2 $3 $4');
	}

	return _uglify(phone).replace(/^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1 $2 $3 $4 $5');
};

export const groupFour = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	if (phone.length === 8) {
		return _uglify(phone).replace(/^([0-9]{4})([0-9]{4})$/, '$1 $2');
	}

	return _uglify(phone).replace(/^([0-9]{2})([0-9]{4})([0-9]{4})$/, '$1 $2 $3');
};

/**
 * Formats the string to a dashed style
 * @function dashed
 * @param  {string} phone Uglified phone string
 * @return {string}       Returns the formatted phone string
 */
export const dashed = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	const {areaCode, localCode, lineNumber} = breakdown(phone);

	if (areaCode) {
		return `${areaCode}-${localCode}-${lineNumber}`;
	}

	return `${localCode}-${lineNumber}`;
};

/**
 * Formats the string to a normal style
 * @function normalize
 * @param  {string} phone Uglified phone string
 * @return {string}       Returns the formatted phone string
 */
export const normalize = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	const {areaCode, localCode, lineNumber} = breakdown(phone);

	if (areaCode) {
		return `(${areaCode}) ${localCode}-${lineNumber}`;
	}

	return `${localCode}-${lineNumber}`;
};

/**
	* Formats the string to a dotted style
	* @function dotted
	* @param  {string} phone Uglified phone string
	* @return {string}       Returns the formatted phone string
	*/
export const dotted = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	const {areaCode, localCode, lineNumber} = breakdown(phone);

	if (areaCode) {
		return `${areaCode}.${localCode}.${lineNumber}`;
	}

	return `${localCode}.${lineNumber}`;
};

const methods = {
	uglify: _uglify,
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
export const longDistance = (phone, oFormat) => {
	if (!isValid(phone)) {
		return phone;
	}
	const {countryCode, areaCode, localCode, lineNumber} = breakdown(phone, 'longDistance');
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (oFormat && oFormat !== 'longDistance' && oFormat !== 'extension') {
		formattedPhone = methods[oFormat](mainNumber);
	}

	return `${countryCode}+${formattedPhone}`;
};

	/**
	* Formats the string to an extension with a custom format style
	* @function extension
	* @param  {string} phone Uglified phone string
	* @param {string} format The desired format for the phone number
	* @return {string}       Returns the formatted phone string
	*/
export const extensionNumber = (phone, oFormat) => {
	if (!isValid(phone)) {
		return phone;
	}
	const {extension, areaCode, localCode, lineNumber} = breakdown(phone, 'extension');
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (oFormat && oFormat !== 'extension' && oFormat !== 'longDistance') {
		formattedPhone = methods[oFormat](mainNumber);
	}

	return `${formattedPhone} x ${extension}`;
};
