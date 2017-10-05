import { uglify } from './index.js';


/**
 * Format a country code for long distance style numbers
 * 
 * @param {String} phone The phone number to format
 * @returns Returns an array
 */
const formatCountryCode = phone => {
	const len = phone.length;
	const countryCodeLen = len - 10;
	const codeReg = new RegExp(`([0-9]{${countryCodeLen}})`);
	const [uglyCountryCode] = phone.match(codeReg);
	let countryCode = uglyCountryCode;

	if (countryCodeLen > 4) {
		countryCode = `${uglyCountryCode.substr(0, 2)}-${uglyCountryCode.substr(2, 4)}`;
	}

	if (countryCodeLen === 4) {
		countryCode = `${uglyCountryCode.substr(0, 1)}-${uglyCountryCode.substr(1, 3)}`;
	}

	return [countryCode, phone.replace(codeReg, '')];
};

/**
 * Format every other piece of the phone number
 * 
 * @param {String} phone The phone number to format
 * @returns Returns an array
 */
const formatCode = (phone, n) => {
	if (!phone) {
		return ['', false];
	}

	const codeReg = new RegExp(`([0-9]{${n}})`);
	const [currCode] = phone.match(codeReg);

	return [currCode, phone.replace(codeReg, '')];
};

export default (phone, type) => {
	const uglyPhone = uglify(phone);
	let countryCode = '';
	let currPhone = uglyPhone;
	let areaCode = '';
	let localCode = '';

	if (type === 'longDistance') {
		[countryCode, currPhone] = formatCountryCode(uglyPhone);
	}

	if (uglyPhone.length >= 10) {
		[areaCode, currPhone] = formatCode(currPhone, 3);
	}

	[localCode, currPhone] = formatCode(currPhone, 3);

	const [lineNumber, extension] = formatCode(currPhone, 4);


	return {
		countryCode,
		areaCode,
		localCode,
		lineNumber,
		extension
	};
};
