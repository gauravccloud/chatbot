var restify = require('restify');
var builder = require('botbuilder');
var apiairecognizer = require('api-ai-recognizer');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var recognizer = new apiairecognizer("889b6e85dc09451a962919f8143ec8e3")
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

var connector = new builder.ConsoleConnector().listen(); 
var bot = new builder.UniversalBot(connector); 
bot.dialog('/',function(session){ 
    session.send("You said %s", session.message.text); 
});


