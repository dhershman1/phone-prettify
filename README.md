phone-prettify
===============================

A really simple phone formatting that can handle most (US) formats and basic extension and long distance style phone numbers.

v1.1.0 - Cleaner and easier to follow code, better structure with es6, and added Tests for the module

## How-To
```js
const pPretty = require('phone-prettify');
pPretty('phone', 'format');
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
const pPretty = require('phone-prettify');
let result = pPretty('3334449955', 'dashed');
// Output: 333-444-9955
```
#### Formatting works with numbers
```js
const pPretty = require('phone-prettify');
let result = pPretty(3334449955, 'dashed');
// Output: 333-444-9955
```
#### Formatting a Long distance based phone number:(US)
```js
const pPretty = require('phone-prettify');
let result = pPretty('13334449955', 'longDistance', 'dashed');
// Output: 1+333-444-9955
```

#### Formatting an extension based phone number:
```js
const pPretty = require('phone-prettify');
let result = pPretty('33344499558989', 'extension', 'dashed');
// Output: 333-444-9955 x 8989
```
