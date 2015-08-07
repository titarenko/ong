function __buildModule (globalObj) {
	var _ = require('lodash');

	function init (overwrite) {
		var keys = ['_', 'Promise', '$'];
		keys.forEach(function (key) {
			if (globalObj[key] && !overwrite) {
				throw new Error('Can not overwrite "' + key + '"!');
			}
		});
		var values = [_, require('bluebird'), {}];
		_.each(keys, function (key, index) {
			globalObj[key] = values[index];
		});
		return api;
	}

	function register (name, value, overwrite) {
		var subject = _.isObject(name) && _.isUndefined(value)
			? name
			: _.zipObject([name], [value]);
		_.each(subject, function (value, key) {
			if (globalObj.$[key] && !overwrite) {
				throw new Error('"' + key + '" already registered!');
			}
			globalObj.$[key] = value;
		});
		return api;
	}

	var api = {
		init: init,
		register: register
	};

	return api;
} // end of __buildModule

module.exports = __buildModule(global);
module.exports.__buildModule = __buildModule;
