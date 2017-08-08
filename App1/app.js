var restify = require("restify");
var builder = require("botbuilder");
var request = require('request-promise').defaults({ encoding: null });

var port = 9000;
var server = restify.createServer();
server.listen(port, function(req,res){
    console.log("Server started at port", port)
});

var connector = new builder.ChatConnector({
    appId: "",
    appPassword: ""
});

server.post("/api/messages", connector.listen());

var bot = new builder.UniversalBot(connector);


//Root dialog
bot.dialog('/',function(session){
    console.log("It comes Here", session.message.text);
    console.log("File is", session.message)
    if(session.message.attachments.length > 0) {
        var attachment = session.message.attachments[0];
        var fileDownload = request(attachment.contentUrl);
        fileDownload.then(function(response){
            var reply = new builder.Message(session)
            .text('Attachment of %s type and size of %s bytes received.', attachment.contentType, response.length);
            session.send(reply);
        }).catch(function (err) {
            console.log('Error downloading attachment:', { statusCode: err.statusCode, message: err.response.statusMessage });
        })
        session.send("Thank you for sharing this attachment. What would you like to know about this?")
    }
});

bot.dialog('greetings', [
  function(session, next){
     session.send("Hello From Bot");
     next();
  },
  function(session) {
      session.send("Hello From Gaurav")
  }
]);
