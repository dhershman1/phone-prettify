simplePhoneFormatter
===============================
## Object
The object acts as a simple holder for the list of function methods that can be called.
```js
var formatPhone = {};
```

## Functions

### format

This function starts the formatting process based on the format sent to it it will break down the phone number into 2 or 3 parts and send it off to what is requested 

##### Usage
Takes 2 with an optional 3rd param, the first param is your phone number string, the second is a string to say which format you want to use the third is an optional opts param which is only required if your using longDistance, or extension formats

>Example:

```js
    formatPhoneNumber.format('5559998877', 'normalize');
```

##### Arguments
- `phone` - string that contains a unformatted phone number
- `format` - the way you wish the number to be formatted (see below for a list of formats)
- `opts` - an object with options, only required for longDistance, and extension formats.

##Formats

### uglify

Simply returns a string with the unformatted phone number
Supports both 10 and 7 digit phone numbers, can be called directly if desired or through format

##### Usage
Takes in a string which contains your phone number

>Example:

```js
    formatPhoneNumber.uglify('(770)-998-6679');
```

>##### Steps
Replaces all the special charactes with empty strings to format it into the 10 or 7 digit string

>Example:
```js
    return phone.replace(/[-.()]/g, '');
```
##### Arguments
- `phone` - string that contains a formatted (or unformatted, but why would you want to do that you weirdo) phone number

### dashed

returns the phone number in a dashed format xxx-xxx-xxxx
Supports both 10 and 7 digit phone numbers
can be called directly but is not recommended just use format

##### Usage
Takes in a object which contains the broken down phone number

>Example:

```js
    formatPhoneNumber.dashed({areaCode: '777', localCode: '555', lineNumber: '6623'});
```

>##### Steps
Returns the built out string

>Example:
```js
    return pObj.areaCode+'-'+pObj.localCode+'-'+pObj.lineNumber;
```
##### Arguments
- `pObj` - an Object containing the broken down phone number

### dotted

returns the phone number in a dotted format xxx.xxx.xxxx
Supports both 10 and 7 digit phone numbers
can be called directly but is not recommended just use format

##### Usage
Takes in a string which contains your phone number

>Example:

```js
    formatPhoneNumber.dotted({areaCode: '777', localCode: '555', lineNumber: '6623'});
```

>##### Steps
Returns the built out string

>Example:
```js
    return pObj.areaCode+'.'+pObj.localCode+'.'+pObj.lineNumber;
```
##### Arguments
- `pObj` - an Object containing the broken down phone number

### normalize

returns the phone number in a normal format (xxx)-xxx-xxxx
Supports both 10 and 7 digit phone numbers
can be called directly but is not recommended just use format

##### Usage
Takes in a string which contains your phone number

>Example:

```js
    formatPhoneNumber.normalize({areaCode: '777', localCode: '555', lineNumber: '6623'});
```

>##### Steps
Returns the built out string

>Example:
```js
    return '('+pObj.areaCode+')-'+pObj.localCode+'-'+pObj.lineNumber;
```
##### Arguments
- `pObj` - an Object containing the broken down phone number

### longDistance

tags on a 1+ to the phone number and uses any format the user requested
Supports 10 digit only
can be called directly but is not recommended just use format

##### Usage
Takes an object of your broken down phone number along with an object containing options

##### Options
- `format` - string of which format you want long distance to use
- `countryCode` - the countryCode number for the digit to be tagged on.

>Example:

```js
    formatPhoneNumber.longDistance({areaCode: '777', localCode: '555', lineNumber: '6623'}, {format: 'dotted'});
```

>##### Steps
If format provided we want to set the number to that format

>Example:
```js
    var number = phone;
    if (opts.format) number = this[opts.format](pObj);
```

Then returns the number with the tagged country code to it
>Example:
```js
    return opts.countryCode+'+'+number;
```

##### Arguments
- `pObj` - an Object containing the broken down phone number
- `opts` - an Object with a user defined format provided

### extension

tags on an extension to the end of the phone number and uses any format the user requested
Supports 10 digit only
can be called directly but is not recommended just use format

##### Usage
Takes an object of your broken down phone number along with an object containing options

##### Options
- `format` - string of which format you want long distance to use
- `extention` - the sring extension you want to tag to the number

>Example:

```js
    formatPhoneNumber.extension({areaCode: '777', localCode: '555', lineNumber: '6623'}, {format: 'dotted', extension: '1234'});
```

>##### Steps
If format provided we want to set the number to that format

>Example:
```js
    var number = phone;
    if (opts.format) number = this[opts.format](pObj);
```

Then returns the number with the extention tagged to it
>Example:
```js
    return number + ' x '+ opts.extention;
```

##### Arguments
- `pObj` - an Object containing the broken down phone number
- `opts` - an Object with a user defined format and extension provided
