var test = require('tape');
var pPretty = require('../index.js');

test('Should throw an error for no phone', function (t) {
	t.plan(1);

	t.throws(pPretty, 'No Phone provided', 'Successfully stopped execution');
});

test('Return a uglified phone number', function (t) {
	t.plan(1);

	var result = pPretty('555-444-1111');

	t.equal(result, '5554441111', ("Returned the uglify format: " + result));
});

test('Return a formatted phone number using numbers', function (t) {
	t.plan(1);

	var result = pPretty(5554441111, 'dotted');

	t.equal(result, '555.444.1111', ("Returned the formatted number: " + result));
});

test('Return a dotted format phone number', function (t) {
	t.plan(1);
	var result = pPretty('5554441111', 'dotted');

	t.equal(result, '555.444.1111', ("Returned the dotted format: " + result));
});

test('Return a dashed format phone number', function (t) {
	t.plan(1);
	var result = pPretty('5554441111', 'dashed');

	t.equal(result, '555-444-1111', ("Returned the dashed format: " + result));
});

test('Return a normal format phone number', function (t) {
	t.plan(1);
	var result = pPretty('5554441111', 'normal');

	t.equal(result, '(555) 444-1111', ("Returned the normal format: " + result));
});

test('Return a long distance format', function (t) {
	t.plan(1);
	var result = pPretty('15554441111', 'longDistance', 'dotted');

	t.equal(result, '1+555.444.1111', ("Returned the long distance format: " + result));
});

test('Return an extension format', function (t) {
	t.plan(1);
	var result = pPretty('55544411118989', 'extension', 'dashed');

	t.equal(result, '555-444-1111 x 8989', ("Returned the extension format: " + result));
});