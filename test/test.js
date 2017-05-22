'use strict';
var fileLister = require('../');

var assert = require('assert');

it(
	'should ',
	function() {
		assert.strictEqual(fileLister('belgian'), 'BEST BEER EVAR!');
	}
);