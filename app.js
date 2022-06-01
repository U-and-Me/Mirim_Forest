var express = require('express');
var http = require('http');
var path = require('path');
var dbconn = require('./index_db');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.use('./MirimWriting', require('./MirimWriting/writing'));


http.createServer(app).listen(3000, function(){
    //console.log(__dirname);
});
