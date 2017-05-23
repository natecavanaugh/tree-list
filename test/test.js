'use strict';
var treeList = require('../');
var chalk = treeList.chalk;

var assert = require('assert');

it(
	'should render a list of files as a tree',
	function() {
		var paths = [
			'first/second/third/file.js',
			'first/fourth/another.js'
		].join('\n');

		var tree = [
			'/first',
			'├─ second/third/file.js',
			'└─ fourth/another.js'
		].join('\n');

		assert.equal(treeList(paths), tree);
	}
);

it(
	'should render a colored list of files as a tree',
	function() {
		chalk.enabled = true;

		var paths = [
			'first/second/third/file.js',
			'first/fourth/another.js'
		].join('\n');

		var tree = [
			chalk.cyan('/first'),
			`├─ ${chalk.cyan('second/third/')}file.js`,
			`└─ ${chalk.cyan('fourth/')}another.js`
		].join('\n');

		assert.equal(treeList(paths), tree);
	}
);

it(
	'should allow an empty string',
	function() {
		chalk.enabled = false;

		assert.equal(treeList(''), '/');
	}
);