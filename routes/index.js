var express = require('express');
var config = require('../config');
var request = require('request');
var Twitter = require('twitter');
var router = express.Router();
var bodyParser = require('body-parser')

var olarkService = require('../service/olark');
var wufooService = require('../service/wufoo');

var urlEncodedParser = bodyParser.urlencoded({extended: false});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/twitter', function(req, res, next) {
	var client = new Twitter({
  		consumer_key: config.twitterConsumerKey,
  		consumer_secret: config.twitterConsumerSecret,
  		access_token_key: config.twitterAccessToken,
  		access_token_secret: config.twitterAccessSecret
	});

	var params = {
		screen_name: 'HudlEngineering',
		user_id: 'HudlEngineering',
		count: 3
	};

	client.get('statuses/user_timeline.json', params, 
		function(error, tweets, response) {
  		if (!error) {
    		console.log('Successfully fetched tweets');
    		res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    		res.send(tweets);
  		}
    	else {
    		console.log(error);
    		res.send(error);
    	}
  	});
});

router.get('/rss-feed', function(req, res, next) {
	var headers = {
        //If wee need something for CORS, put it here 
    };

    var options = {
        url: 'http://public.hudl.com/bits/feed/',
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        if (!error) {
        	res.header("Access-Control-Allow-Origin", "*");
  			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        	res.send(response.body);
        }
        else {
    		console.log(error);
        	res.send(error);
        }
    });
});

router.post('/olark/chats', function(req, res, next){
  var chat = req.body;
  olarkService.processChat(chat);
  res.send(200);
});

router.post('/wufoo/surveys', urlEncodedParser, function(req, res, next){
  var survey = req.body;
  wufooService.processSurvey(survey);
  res.send(200);
});

module.exports = router;