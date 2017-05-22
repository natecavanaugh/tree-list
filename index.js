'use strict';
var _ = require('lodash');
var CAT = require('classic-ancii-tree');
var path = require('path');
var tree_walk = require('tree-walk');
var fs = require('fs');

var chalk = require('chalk');

module.exports = function(str, commonRoot) {
	var obj = {label: ''};

	var input = (str || '').split('\n');

	var obj = {label: '', nodes: []};

	_.forEach(input, function(item, index) {
		var cache = obj.nodes;

		item = item.split(path.sep);

		var last = item.length - 1;

		_.forEach(item, function(item, index) {
			var fileObj = _.find(cache, ['label', item]);

			if (!fileObj) {
				fileObj = {label: item, nodes: []};
				cache.push(fileObj);
			}

			cache = fileObj.nodes;
		});
	});

	var nodeWalker = tree_walk(function(item){
		return item.nodes;
	});

	nodeWalker.postorder(obj, function(item, index, parent) {
		if (item.nodes.length) {
			item.color = 'cyan';
		}

		if (parent && parent.nodes.length === 1) {
			var label = item.label;
			parent.label = parent.label + path.sep + label;
			parent.nodes = item.nodes;
			parent.color = item.color;
		}
	});

	nodeWalker.preorder(
		obj,
		function(item, index, parent) {
			var label = item.label;

			if (!item.nodes.length && label.includes('/')) {
				var dir = path.dirname(label);
				var basename = path.basename(label);

				item.label = `${chalk.cyan(dir + '/')}${basename}`;
			}
		}
	);

	return CAT(obj);
};