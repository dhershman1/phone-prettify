const formatCountryCode = (phone) => {
	const len = phone.length;
	const countryCodeLen = len - 10;
	const codeReg = new RegExp(`([0-9]{${countryCodeLen}})`);
	const [uglyCountryCode] = phone.match(codeReg);
	let countryCode = uglyCountryCode;

	if (countryCodeLen > 4) {
		countryCode = `${countryCode.substr(0, 2)}-${countryCode.substr(2, 4)}`;
	}

	if (countryCodeLen === 4) {
		countryCode = `${countryCode.substr(0, 1)}-${countryCode.substr(1, 3)}`;
	}

	return [countryCode, phone.replace(codeReg, '')];
};

const getCode = (phone, n) => {
	if (!phone) {
		return ['', false];
	}

	const codeReg = new RegExp(`([0-9]{${n}})`);
	const [currCode] = phone.match(codeReg);

	return [currCode, phone.replace(codeReg, '')];
};

export default (phone, type) => {
	const uglyPhone = phone.replace(/[a-z]\w+|\W/ig, '');
	let countryCode = '';
	let currPhone = uglyPhone;

	if (type === 'longDistance') {
		[countryCode, currPhone] = formatCountryCode(uglyPhone);
	}
	let areaCode = '';
	let localCode = '';

	if (uglyPhone.length >= 10) {
		[areaCode, currPhone] = getCode(currPhone, 3);
	}

	[localCode, currPhone] = getCode(currPhone, 3);

	const [lineNumber, extension] = getCode(currPhone, 4);

	return {
		countryCode,
		areaCode,
		localCode,
		lineNumber,
		extension
	};
};
