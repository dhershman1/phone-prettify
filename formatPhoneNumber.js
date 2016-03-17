/**
 * @overview Format phone numbers into a nice clean state
 * @author Dustin Hershman
 * @version 1.0.0
 */
var formatPhoneNumber = {

		isFull: false,

		format: function(phone, format) {
			phone = this.uglify(phone.toString());
			var breakdown = {};
			if (phone.length === 10) {
				this.isFull = true;
				breakdown = {
					areaCode: phone.substr(0, 3),
					localCode: phone.substr(3, 3),
					lineNumber: phone.substr(6, 4)
				};
			} else if (phone.length === 11) {
				this.isFull = true;
				breakdown = {
					countryCode: phone.substr(0, 1),
					areaCode: phone.substr(1, 3),
					localCode: phone.substr(4, 3),
					lineNumber: phone.substr(7, 4)
				}
				return this.longDistance(breakdown, format);
			} else if (phone.length > 11){
				this.isFull = true;
				breakdown = {
					extension: phone.substr(10),
					areaCode: phone.substr(0, 3),
					localCode: phone.substr(3, 3),
					lineNumber: phone.substr(6, 4)
				}
				return this.extension(breakdown, format);
			} else {
				this.isFull = false;
				breakdown = {
					localCode: phone.substr(0, 3),
					lineNumber: phone.substr(3, 4)
				};
			}
			return (format.toLowerCase() === 'uglify') ? phone : this[format](breakdown, opts);
		},

		uglify: function(phone) {
			return phone.replace(/[a-z]\w+|\W/gi, '');
		},

		dashed: function(pObj) {
			return ((this.isFull) ? pObj.areaCode +'-' : '') + pObj.localCode+'-'+pObj.lineNumber;
		},

		normalize: function(pObj) {
			return ((this.isFull) ? '('+pObj.areaCode+')' : '')+ pObj.localCode+'-'+pObj.lineNumber;
		},

		dotted: function(pObj) {
			return ((this.isFull) ? pObj.areaCode : '')+'.'+pObj.localCode+'.'+pObj.lineNumber;
		},

		longDistance: function(pObj, format) {
			return (format) ? pObj.countryCode+'+'+this[format](pObj) : pObj.countryCode+'+'+pObj.areaCode+'-'+pObj.localCode+'-'+pObj.lineNumber;
		},

		extension: function(pObj, format) {
			return (format) ? this[format](pObj)+' x '+pObj.extension : pObj.areaCode+'-'+pObj.localCode+'-'+pObj.lineNumber+' x '+pObj.extension;
		}
	}
