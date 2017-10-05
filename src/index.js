import breakdown from './breakdown';

/**
 * @module Phone-Prettify
 */

export const uglify = phone => phone.replace(/[a-z]\w+|\W/gi, '');

const validate = phone => phone && (/^[0-9]{7,}$/).test(uglify(phone));

export const groupTwo = phone => {
	if (!validate(phone)) {
		return phone;
	}
	if (phone.length === 8) {
		return uglify(phone).replace(/^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1 $2 $3 $4');
	}

	return uglify(phone).replace(/^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1 $2 $3 $4 $5');
};

export const groupFour = phone => {
	if (!validate(phone)) {
		return phone;
	}
	if (phone.length === 8) {
		return uglify(phone).replace(/^([0-9]{4})([0-9]{4})$/, '$1 $2');
	}

	return uglify(phone).replace(/^([0-9]{2})([0-9]{4})([0-9]{4})$/, '$1 $2 $3');
};

/**
 * Formats the string to a dashed style
 * @function dashed
 * @param  {string} phone Uglified phone string
 * @return {string}       Returns the formatted phone string
 */
export const dashed = phone => {
	if (!validate(phone)) {
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
	if (!validate(phone)) {
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
	if (!validate(phone)) {
		return phone;
	}
	const {areaCode, localCode, lineNumber} = breakdown(phone);

	if (areaCode) {
		return `${areaCode}.${localCode}.${lineNumber}`;
	}

	return `${localCode}.${lineNumber}`;
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
export const longDistance = (phone, format) => {
	if (!validate(phone)) {
		return phone;
	}
	const {countryCode, areaCode, localCode, lineNumber} = breakdown(phone, 'longDistance');
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (format && format !== 'longDistance' && format !== 'extension') {
		formattedPhone = methods[format](mainNumber);
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
export const extensionNumber = (phone, format) => {
	if (!validate(phone)) {
		return phone;
	}
	const {extension, areaCode, localCode, lineNumber} = breakdown(phone, 'extension');
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (format && format !== 'extension' && format !== 'longDistance') {
		formattedPhone = methods[format](mainNumber);
	}

	return `${formattedPhone} x ${extension}`;
};
