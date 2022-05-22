var express = require('express');
var app = express();

var port = app.listen(process.env.port || 5050);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(){

});