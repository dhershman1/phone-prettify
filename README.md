[![Build Status](https://travis-ci.org/dhershman1/phone-prettify.svg?branch=master)](https://travis-ci.org/dhershman1/phone-prettify)

# phone-prettify

A really simple phone formatting that can handle most (US) formats and basic extension and long distance style phone numbers.

## How-To
```js
var pPretty = require('phone-prettify');
// Using it as a function
pPretty('phone', 'format');
// Get the method you want returned to use (uses the format names)
var dashed = pPretty({format: 'dashed'});
dashed(phone);
dashed(phone2);
```

## Formats

- `uglify` - Returns string of entered phone with no formatting
- `normalize` - Returns phone number with `(xxx)xxx-xxxx` format
- `dashed`  - Returns phone number with `xxx-xxx-xxxx` format
- `dotted` - Returns phone number with `xxx.xxx.xxxx` format
- `longDistance` - Returns phone number with `x+xxx-xxx-xxxx` format take an optional param to format with different styles
- `extension` - Returns phone number with `XXX-XXX-XXXX x XXXX` format takes an optional param to format with different styles

### Using extra params
The extra parameter is used only for `extension` and `longDistance` and is completely optional, This will format it to one of the other format styles.

## Usage
#### Formatting a regular US phone number:
```js
var pPretty = require('phone-prettify');
var result = pPretty('3334449955', 'dashed');
// Output: 333-444-9955
// OR
var dashed = pPretty({format: 'dashed'});
var prettyNum = dashed('3334449955');
// prettyNum: 333-444-9955
```
#### Formatting works with numbers
```js
var pPretty = require('phone-prettify');
var result = pPretty(3334449955, 'dashed');
// Output: 333-444-9955
// OR
var dashed = pPretty({format: 'dashed'});
var prettyNum = dashed(3334449955);
// prettyNum: 333-444-9955
```
#### Formatting a Long distance based phone number:(US)
```js
var pPretty = require('phone-prettify');
var result = pPretty('13334449955', 'longDistance', 'dashed');
// Output: 1+333-444-9955
// OR
var longDistance = pPretty({format: 'longDistance'});
var prettyNum = longDistance('13334449955', 'dotted');
// prettyNum: 1+ 333.444.9955
// NOTE: the 2nd argument can be any of the format names shown above (besides longDistance obviously)
```

#### Formatting an extension based phone number:
```js
var pPretty = require('phone-prettify');
var result = pPretty('33344499558989', 'extension', 'dashed');
// Output: 333-444-9955 x 8989
// OR
var extension = pPretty({format: 'extension'});
var prettyNum = extension('33344499558989', 'dotted');
// prettyNum: 333.444.9955 x 8989
// NOTE: the 2nd argument can be any of the format names shown above (besides longDistance obviously)
```
