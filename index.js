/**
 * @overview Format phone numbers into a nice clean state
 * @author Dustin Hershman
 * @version 1.0.4
 */
var formatPhoneNumber = function(phone, format) {
	if (!phone || !format) return null;
	phone = methods.uglify(phone.toString());
	var breakdown = {};
	var isFull = false;
	if(phone.length === 10) {
		isFull = true;
		breakdown = {
			areaCode: phone.substr(0, 3),
			localCode: phone.substr(3, 3),
			lineNumber: phone.substr(6, 4)
		};
	} else if(phone.length === 11) {
		isFull = true;
		breakdown = {
			countryCode: phone.substr(0, 1),
			areaCode: phone.substr(1, 3),
			localCode: phone.substr(4, 3),
			lineNumber: phone.substr(7, 4)
		};
		return methods.longDistance(breakdown, format);
	} else if(phone.length > 11) {
		isFull = true;
		breakdown = {
			extension: phone.substr(10),
			areaCode: phone.substr(0, 3),
			localCode: phone.substr(3, 3),
			lineNumber: phone.substr(6, 4)
		};
		return methods.extension(breakdown, format);
	} else {
		isFull = false;
		breakdown = {
			localCode: phone.substr(0, 3),
			lineNumber: phone.substr(3, 4)
		};
	}
	return(format.toLowerCase() === 'uglify') ? phone : methods[format](breakdown, isFull);
};

var methods = {
	uglify: function(phone) {
		return phone.replace(/[a-z]\w+|\W/gi, '');
	},

	dashed: function(pObj, isFull) {
		return((isFull) ? pObj.areaCode + '-' : '') + pObj.localCode + '-' + pObj.lineNumber;
	},

	normalize: function(pObj, isFull) {
		return((isFull) ? '(' + pObj.areaCode + ')' : '') + pObj.localCode + '-' + pObj.lineNumber;
	},

	dotted: function(pObj, isFull) {
		return((isFull) ? pObj.areaCode : '') + '.' + pObj.localCode + '.' + pObj.lineNumber;
	},

	longDistance: function(pObj, format) {
		return(format) ? pObj.countryCode + '+' + methods[format](pObj, true) : pObj.countryCode + '+' + pObj.areaCode + '-' + pObj.localCode + '-' + pObj.lineNumber;
	},

	extension: function(pObj, format) {
		return(format) ? methods[format](pObj, true) + ' x ' + pObj.extension : pObj.areaCode + '-' + pObj.localCode + '-' + pObj.lineNumber + ' x ' + pObj.extension;
	}
};

module.exports = formatPhoneNumber;