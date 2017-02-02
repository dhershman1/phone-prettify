phone-prettify
===============================

A really simple phone formatting that can handle most (US) formats and basic extension and long distance style phone numbers.

## How-To
```js
var phonePrettify = require('phone-prettify');
phonePrettify('phone', 'format');
```

## Usage
Usage is pretty simple
```js
var phonePrettify = require('phone-prettify');
var test = phonePrettify('3334449955', 'dashed');
//test would output: 333-444-9955
```

## formats

- `uglify` - Returns string of entered phone with no formatting
- `normalize` - Returns phone number with `(xxx)xxx-xxxx` format
- `dashed`  - Returns phone number with `xxx-xxx-xxxx` format
- `dotted` - Returns phone number with `xxx.xxx.xxxx` format

## Auto-formats
`longDistance` - Returns the phone number in a long distance format
`extention` - Returns the phone number with a extension style format

Based on length of the phone number some formats are automatically used if these are used and you sent a format these will also use that format when adjusting

in which case
```js
phonePrettyify('55577788995567', 'normalize');
```

would return `(555)777-8899 x 5567`
And
```js
phonePrettyify('15557778899', 'normalize');
```
would return `1+(555)777-8899`
