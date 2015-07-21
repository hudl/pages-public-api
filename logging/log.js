var winston = require('winston');
var config = require('../config');

var logger = new (winston.Logger)({
	transports: [
	  new (winston.transports.Console)(),
	  new (winston.transports.File)({ 
	  	filename: config.logFilePath,
  		timestamp: function() {
			var now = new Date();
			return now.toISOString();
		},
		formatter: function(options) {
			var message = undefined !== options.message ? ' ' + options.message : '';
			var meta = options.meta && Object.keys(options.meta).length ? ' ' + JSON.stringify(options.meta) : '';
			return options.timestamp() + ' ' + options.level.toUpperCase() + message + meta;
		}})
	],
});

module.exports = logger;