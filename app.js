var express = require('express');
var http = require('http');
var path = require('path');

const mysql = require('mysql');
var db_config = require('./.config.json');

var static = require('serve-static');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.use('/MirimWriting', static(path.join(__dirname, 'MirimWriting')));
app.use('/Mirim TMI', static(path.join(__dirname, 'Mirim TMI')));


/*
// mysql 접속 설정
const conn = mysql.createConnection({
    host : db_config.host,
    port : '3306',
    user : db_config.user,
    password : db_config.password,
    database : db_config.database
});

conn.connect((err) => {
    if(err){
        console.log(err);
        conn.end();
        throw err;
    }else{
        console.log("DB 접속 성공");
    }
});

*/

// 글쓰기 라우팅 함수
router.route('/process/send').post(function(req, res){
    console.log('/process/send 호출됨');

    var paramId = req.body.name || req.query.name;

    console.log(paramId);

    
});

app.use('/', router);

http.createServer(app).listen(3000, function(){
   // console.log(__dirname);
});
