var logger = require('../logging/log.js');
var _ = require('underscore');
var zendesk = require('node-zendesk');
var config = require('../config');

var client = zendesk.createClient({
	username: config.zendesk.username,
	token: config.zendesk.authToken,
	remoteUri: 'https://hudl.zendesk.com/api/v2'
});

function processTicket(ticket) {
	var id = Number(ticket.id);
	client.ticketmetrics.list(id, function(err, req, results){
		logger.info('Processing email first-reply time', {
			assignee: ticket.assignee,
			replyTimeInMinutes: results.reply_time_in_minutes.business
		})
	});
}

module.exports = {
	processTicket: processTicket
}