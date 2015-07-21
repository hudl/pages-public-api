var logger = require('../logging/log');

const HudlTeamMemberField = 'Field6';
const CoachEmailField = 'Field9';
const WouldYouHireField = 'Field5'; 
const HudlRepRatingField = 'Field13';
const OverallExperienceField = 'Field4';

function processSurvey(survey){
	logger.info('Received Wufoo Support feedback data', {
		CoachEmail: survey[CoachEmailField],
		WouldYouHire: survey[WouldYouHireField],
		HudlTeamMember: survey[HudlTeamMemberField],
		HudlTeamMemberRating: parseRating(survey[HudlRepRatingField]),
		OverallSupportRating: survey[OverallExperienceField]
	});
}

function parseRating(rating){
	var number = Number(rating);
	if (isNaN(number)){
		var spaceIndex = rating.indexOf(' ');
		var numberPart = rating.substring(0, spaceIndex);
		number = Number(numberPart);
	}

	return number;
}

module.exports = {
	processSurvey: processSurvey
}