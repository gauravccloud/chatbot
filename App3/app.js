var apiai = require('apiai');
var uuidv1 = require('uuid/v1');
var sessionId = uuidv1();

var app = apiai("18301ee135374793b69033f4ca755575");

var request = app.textRequest('austria', {
    sessionId: sessionId
});

request.on('response', function(response) {
    console.log("response came")
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end(function(response){
    console.log("Hello")
    console.log(response);
});
