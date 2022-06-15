var express = require('express');
var http = require('http');
var path = require('path');

const mysql = require('mysql');
var db_config = require('./.config.json');

var static = require('serve-static');
var bodyParser = require('body-parser');
var jsdom = require("jsdom");
var cheerio = require('cheerio');
var request = require('request');

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

var $;
var html_write;
var html_reset;


app.get('/MirimWriting', function(req, res){
    console.log("이어서 글짓기");
    //res.sendFile(__dirname + '/MirimWriting/writing.html');

    request('http://localhost:3000/MirimWriting/writing.html', function(error, response, html){
            if(error) {throw error};

            $ = cheerio.load(html);
            
            //console.log($.html());

            html_write = $.html();
            html_write += `
            <script>
                var chatView = document.querySelector("#chatView");
            `;

            html_reset = html_write;
    })
    
    // DB 글 가져오기
    var sql = 'SELECT * FROM WRITING';
    var write = {};
    var i = 0;

    conn.query(sql, function(err, results, field){
        write = results;
    });

    setTimeout(function(){
        //console.log(write);

        while(i < write.length){
        html_write += `
         chatView.innerHTML += '<div style=" width:auto; height: 80px; margin-left:2%; margin-top:1%; font-size:30px; font-weight: 600; line-height: 78px; padding-left:1%; padding-right:1%; background-color:white; border-radius:10px">${write[i].user_write}</div>';    
        `;

        i++;
        }
        html_write += `
            </script>
        `;

        //console.log(html_write);

        res.send(html_write);

        html_write = html_reset;
    }, 500);
});

var $2;
var html_tmi;
var html_tmi_reset;

app.get('/MirimTMI', function(req, res){
    console.log("오늘 나의 TMi");
    //res.sendFile(__dirname + '/MirimTMI/tmi.html');

    request('http://localhost:3000/MirimTMI/tmi.html', function(error, response, html){
            if(error) {throw error};

            $2 = cheerio.load(html);

            html_tmi =$2.html();
            html_tmi += `
            <script>
                var tmiView = document.querySelector("#tmiView");
            `;

            html_tmi_reset = html_tmi;
    })

    // DB 글 가져오기
    var sql = 'SELECT * FROM tmi';
    var tmi = {};
    var i = 0;

    // 콘솔로 보기
    conn.query(sql, function(err, results, field){
        // console.log(results[i].title);
        // console.log(results[i].content);
        // console.log(results[i].nickname);
        tmi = results;
    });    

    setTimeout(function(){
        //console.log(write);

        while(i < tmi.length){
            var title = tmi[i].title;
            var content = tmi[i].content;
            var nickname = tmi[i].nickname;

            html_tmi += `
            tmiView.innerHTML += '<span style=" width:auto; height: 80px; margin-left:2%; margin-top:1%; font-size:30px; font-weight: 600; line-height: 78px; padding-left:1%; padding-right:1%; background-color:white; border-radius:10px">${title}</span >';    
            tmiView.innerHTML += '<span  style=" width:auto; height: 80px; margin-left:2%; margin-top:1%; font-size:30px; font-weight: 600; line-height: 78px; padding-left:1%; padding-right:1%; background-color:white; border-radius:10px">${content}</span >';    
            tmiView.innerHTML += '<span  style=" width:auto; height: 80px; margin-left:2%; margin-top:1%; font-size:30px; font-weight: 600; line-height: 78px; padding-left:1%; padding-right:1%; background-color:white; border-radius:10px">${nickname}</span >';     
            `;

            i++;
        }

        html_tmi += `
            </script>
        `;

        console.log(html_tmi);

        res.send(html_tmi);

        html_tmi = html_tmi_reset;
    }, 500);
    
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