var test = require('tape');
var pPretty = require('../dist/phone-prettify.umd.js');

test('Should throw an error for no phone', function (t) {
	t.throws(pPretty, 'No Phone Number/String/Object provided', 'Successfully stopped execution');
	t.end();
});

test('Return a uglified phone number', function (t) {
	var result = pPretty('555-444-1111');

	t.equal(result, '5554441111', ('Returned the uglify format: ' + result));

	result = pPretty('555444-1111');
	t.equal(result, '5554441111', 'Returned uglify format even with semi broken format sent in' + result);
	t.end();
});

test('Return a formatted phone number using numbers', function (t) {
	var result = pPretty(5554441111, 'dotted');

	t.equal(result, '555.444.1111', ('Returned the formatted number: ' + result));
	result = pPretty('555-444-1111', 'dotted');

	t.equal(result, '555.444.1111', 'Converted dashed formatting to dotted');
	t.end();
});

test('Return a dashed format phone number', function (t) {
	var result = pPretty('5554441111', 'dashed');

	t.equal(result, '555-444-1111', ('Returned the dashed format: ' + result));
	result = pPretty('555.444.1111', 'dashed');

	t.equal(result, '555-444-1111', 'Converted dotted formatting to dashed');
	t.end();
});

test('Return a normal format phone number', function (t) {
	var result = pPretty('5554441111', 'normal');

	t.equal(result, '(555) 444-1111', ('Returned the normal format: ' + result));
	result = pPretty('(555) 444-1111', 'dotted');

	t.equal(result, '555.444.1111', 'Converted normalized formatting to dotted');
	t.end();
});

test('Return a long distance format', function (t) {
	var result = pPretty('15554441111', 'longDistance', 'dotted');

	t.equal(result, '1+555.444.1111', ('Returned the long distance format: ' + result));
	t.end();
});

test('Return an extension format', function (t) {
	var result = pPretty('55544411118989', 'extension', 'dashed');

	t.equal(result, '555-444-1111 x 8989', ('Returned the extension format: ' + result));
	t.end();
});

test('Run dashed fromat from methods', function (t) {
	var dashed = pPretty({format: 'dashed'});
	var result = dashed('5554441111');

	t.equal(result, '555-444-1111', 'Return dashed format when using set method');
	t.end();
});

test('Run dotted format from methods', function (t) {
	var dotted = pPretty({format: 'dotted'});
	var result = dotted('5554441111');

	t.equal(result, '555.444.1111', 'Return dotted format when using set method');
	t.end();
});

test('Run normal format from methods', function (t) {
	var normalize = pPretty({format: 'normal'});
	var result = normalize('5554441111');

	t.equal(result, '(555) 444-1111', 'Return normalize format when using set method');
	t.end();
});

test('Run extension format from methods', function (t) {
	var extension = pPretty({format: 'extension'});
	var result = extension('55544411118989', 'normal');

	t.equal(result, '(555) 444-1111 x 8989', 'Return extension format when using set method');
	t.end();
});

test('Run extension format from methods', function (t) {
	var extension = pPretty({format: 'extension'});
	var result = extension('55544411118989', 'normal');

	t.equal(result, '(555) 444-1111 x 8989', 'Return extension format when using set method');
	t.end();
});

test('Run long distance format from methods', function (t) {
	var longDistance = pPretty({format: 'longDistance'});
	var result = longDistance('15554441111', 'normal');

	t.equal(result, '1+(555) 444-1111', 'Return long distance format when using set method');
	t.end();
});
