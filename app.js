var express = require('express');
var http = require('http');
var path = require('path');

const mysql = require('mysql');
var db_config = require('./.config.json');
var writing = require('./MirimWriting/writing');

var static = require('serve-static');
var bodyParser = require('body-parser');
var jsdom = require('jsdom');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/'));
app.use('/MirimWriting', static(path.join(__dirname, '/MirimWriting')));
app.use('/MirimTMI', static(path.join(__dirname, 'MirimTMI')));

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

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.get('/MirimWriting', function(req, res){
    console.log("이어서 글짓기");
    res.sendFile(__dirname + '/MirimWriting/writing.html');

    // DB 글 가져오기
    var sql = 'SELECT * FROM WRITING';
    var msg = {};

    conn.query(sql, function(err, results, field){
       msg = results;
    });

    
    
});

app.get('/MirimTMI', function(req, res){
    console.log("오늘 나의 TMi");
    res.sendFile(__dirname + '/MirimTMI/tmi.html');

    // DB 글 가져오기
    var sql = 'SELECT * FROM WRITING';
    var msg = {};

    conn.query(sql, function(err, results, field){
       msg = results;
    });    
    
});

// 글쓰기 라우팅 함수
router.route('/process/send').post(function(req, res){
    console.log('/process/send 호출됨');

    var paramId = req.body.name || req.query.name;

    console.log(paramId);

    // DB에 글 저장
    var sql = 'INSERT INTO WRITING VALUES("' + paramId + '")';
    conn.query(sql, function(err, results){
        if(err) throw err;
    });
});

// TMI 라우팅 함수
router.route('/process/tmisend').post(function(req, res){
    console.log('/process/tmisend 호출됨');

    var paramTitle = req.body.title || req.query.title;
    var paramContent = req.body.content || req.query.ticontenttle;
    var paramNickname = req.body.nickname || req.query.nickname;

    console.log(paramTitle + "  " + paramContent + "   " + paramNickname);

    // DB에 내용 저장
    var sql = 'INSERT INTO TMI VALUES("' + paramTitle + '", "' + paramContent + '", "' + paramNickname + '")';
    conn.query(sql, function(err, results){
        if(err) throw err;
    });

    res.redirect('/MirimTMI/tmi.html');

});

app.use('/', router);

http.createServer(app).listen(3000, function(){
   // console.log(__dirname);
});