/**
 * @overview Format phone numbers into a nice clean state
 * @author Dustin Hershman
 * @version 1.0.0
 */
var formatPhoneNumber = {

    type: null,

    format: function(phone, format, opts) {
        phone = this.uglify(phone.toString());
        var breakdown = {};
        if (phone.length === 10) {
            this.type = 'full';
            breakdown = {
                areaCode: phone.substr(0, 3),
                localCode: phone.substr(3, 3),
                lineNumber: phone.substr(6, 4)
            }
        } else {
            this.type = 'short';
            breakdown = {
                localCode: phone.substr(0, 3),
                lineNumber: phone.substr(3, 4)
            }
        }
        return (format.toLowerCase() === 'uglify') ? this.uglify(phone) : this[format](breakdown, opts);
    },

    uglify: function(phone) {
        return phone.replace(/\W/g, '');
    },

    dashed: function(pObj) {
        if (this.type === 'full') {
            return pObj.areaCode + '-' + pObj.localCode + '-' + pObj.lineNumber;
        } else {
            return pObj.localCode + '-' + pObj.lineNumber;
        }
    },

    normalize: function(pObj) {
        if (this.type === 'full') {
            return '(' + pObj.areaCode + ')' + pObj.localCode + '-' + pObj.lineNumber;
        } else {
            return pObj.localCode + '-' + pObj.lineNumber;
        }

    },

    dotted: function(pObj) {
        if (this.type === 'full') {
            return pObj.areaCode + '.' + pObj.localCode + '.' + pObj.lineNumber;
        } else {
            return pObj.localCode + '.' + pObj.lineNumber;
        }
    },

    longDistance: function(pObj, opts) {
        var number = phone;
        if (opts.format) number = this[opts.format](pObj);
        return opts.countryCode + '+' + number;
    },

    extension: function(pObj, opts) {
        var number = phone;
        if (opts.format) number = this[opts.format](pObj);
        return number + ' x ' + opts.extention;
    }
}
