'use strict';

var _ = require('lodash');
var meow = require('meow');
var getStdin = require('get-stdin');
var Promise = require('bluebird');

var treeList = require('./');

var getCLI = function() {
	return meow(`
	Usage
	$ tree-list [string]
	$ [string] | tree-list

	Options
	-e, --expand Whether to expand directories to their own line, even if it only has another directory as it's child
	--root The root path to render the tree with

	Examples:

	$ tree-list "foo/bar/baz
	foo/bar/foo
	foo/baz bar/baz/boo.js"

	├─ foo
	│  ├─ bar
	│  │  ├─ baz
	│  │  └─ foo
	│  └─ baz
	└─ bar/baz/boo.js

	$
`,
		{
			alias: {
				e: 'expand'
			},
			boolean: 'e',
			string: 'root'
		}

	);
};

class CLI {
	constructor(config) {
		config = config || {};

		this._cli = config.cli || getCLI();

		this.start = this._init();
	}

	run() {
		return Promise.resolve(this.start).bind(this).then(
			function(input) {
				return treeList(input, this._cli.flags);
			}
		);
	}

	_init() {
		var instance = this;

		var cli = instance._cli;

		return getStdin().then(
			function(stdin) {
				if (stdin) {
					stdin = _.compact(stdin.split('\n'));
				}

				return (stdin || cli.input).join('\n');
			}
		);
	}
}

var cliInstance = new CLI();

cliInstance.CLI = cliInstance.constructor = CLI;

module.exports = cliInstance;