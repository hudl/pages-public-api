var logger = require('../logging/log.js');
var _ = require('underscore');

function processChat(chat){
	var responseTime = getTimeToResponse(chat);
	var totalChatTime = getTotalChatTime(chat);

	// Repeating a search below but realistically this will
	// loop through probably at most like 5 small items before
	// finding one. Oh well.
	var firstReply = _.findWhere(chat.items, { kind: 'MessageToVisitor'});
	var operatorId = firstReply.operatorId;
	var operatorEmail = chat.operators[operatorId] ? chat.operators[operatorId].emailAddress : 'NotAvailable';
	
	if (responseTime > 0){
		logger.info('Received Olark chat data', {
			timeToResponseInSeconds: responseTime,
			assignee: operatorEmail,
			totalChatTime: totalChatTime
		});
	}
}

function getTimeToResponse(chat){
	var events = chat.items;
	if (events.length <= 1){
		return 0;
	}
	var firstMessage = _.findWhere(events, { kind: 'MessageToOperator' });
	var firstReply = _.findWhere(events, {kind: 'MessageToVisitor'});

	if (!(firstReply && firstMessage)){
		return 0;
	}

	var firstMessageTime = Number(firstMessage.timestamp);
	var firstReplyTime = Number(firstReply.timestamp);

	if (isNaN(firstReplyTime) || isNaN(firstMessageTime)){
		return 0;
	}

	return firstReplyTime - firstMessageTime;
}

function getTotalChatTime(chat){
	var events = chat.items;
	var firstEvent = _.first(events);
	var lastEvent = _.last(events);

	return Number(lastEvent.timestamp) - Number(firstEvent.timestamp);
}

module.exports = {
	processChat: processChat
}