#!/usr/bin/env node

'use strict';
var meow = require('meow');
var fileLister = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ tree-list [string]'
	]
});

var argv = require('minimist')(process.argv.slice(2));

var data;

var encoding = 'utf-8';

var processData = function() {
	console.log(fileLister(data || '', argv.root || ''));
};

if (process.stdin.isTTY) {
  // Even though executed by name, the first argument is still "node",
  // the second the script name. The third is the string we want.

	data = argv._[0];

	processData();
}
else {
  data = '';
  process.stdin.setEncoding(encoding);

  process.stdin.on('readable', function() {
    var chunk;
    while (chunk = process.stdin.read()) {
      data += chunk;
    }
  });

  process.stdin.on('end', function () {
    // There will be a trailing \n from the user hitting enter. Get rid of it.
    data = data.replace(/\n$/, '');

    processData();
  });
}