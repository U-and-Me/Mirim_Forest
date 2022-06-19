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
app.use('/contents', static(path.join(__dirname, '/contents')));
app.use('/MirimWriting', static(path.join(__dirname, '/MirimWriting')));
app.use('/MirimTMI', static(path.join(__dirname, 'MirimTMI')));
app.use('/MirimTest', static(path.join(__dirname, '/MirimTest')));
app.use('/Game_town', static(path.join(__dirname, '/Game_town')));
app.use('/MiniGame', static(path.join(__dirname, '/Game_town')));
app.use('/AddUser', static(path.join(__dirname, '/Game_town')));

// 필터링
var filtering = require('./.filter');

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

app.get('/contents', function(req, res){
    res.sendFile(__dirname + '/contents/content.html');
});

app.get('/MirimTest', function(req, res){
    res.sendFile(__dirname + '/MirimTest/MirimTest.html');
});

app.get('/AddUser', function(req, res){
    res.sendFile(__dirname + '/Game_town/user.html');
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
            
            chatView.scrollBy(0, chatView.scrollHeight);
            
            var message = document.getElementById('msg').value; 
            msg.value='';
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

            html_tmi += 
            `
                tmiView.innerHTML += '<div id="tmitest" style="margin-left:5%; width:auto; height: auto; background-color:#2A671C" > </div>';

                var tmitest = document.getElementById('tmitest');

                tmitest.innerHTML += '<span style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:30px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">${title}<br></span>';    
                tmitest.innerHTML += '<span style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:30px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">${content}<br></span>';    
                tmitest.innerHTML += '<span style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:20px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">${"TMI 작성자 : " + nickname}<br><br></span>';    
            `;
            i++;
        }

        html_tmi += 
        `
            </script>
        `;

        //console.log(html_tmi);

        res.send(html_tmi);

        html_tmi = html_tmi_reset;
    }, 500);
    
});


var user_click_house;

var town_html;
var nick_house;
app.get('/Game_town', function(req, res){

    // 집주인 있을 경우 닉네임 보여주기
    request('http://localhost:3000/Game_town/town.html', function(error, response, html){
        if(error) {throw error};

        $ = cheerio.load(html);

        town_html = $.html();
        town_html += `
        <script>
            var houses = [];
            for(let i = 1; i < 6; i++){
                var house = 'house' + i.toString();
                houses[i-1] = document.getElementById(house);
            }
        `;
    });   

    var sql = 'SELECT nickname, house FROM townGame';

    conn.query(sql, function(err, results, field){
        console.log(results);
        nick_house = results;
    });    

    // 현재 집을 갖고 있는 사람의 닉네임 보여주기
    setTimeout(function(){
        for(let i = 0; i < 5; i++){
            if(nick_house[i].nickname.length == 0){
                town_html += `houses[${i}].innerHTML += '<span  style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:30px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">주인없음</span>';`;
            }else{
                town_html += `houses[${1}].innerHTML += '<span  style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:30px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">${nick_house[i].nickname}</span>';`;
            }
        }
        town_html += `
            </script>
        `;

        res.send(town_html);
    }, 500);
});

var q1, q2, q_ans;
var select_house; 
app.get('/MiniGame', function(req, res){
    
    select_house = user_click_house;
    console.log("dddd : " + select_house + "  " + user_click_house);

    // 페이지 읽어서 문제 보여주기
    request('http://localhost:3000/Game_town/miniGame.html', function(error, response, html){
        if(error) {throw error};

        $ = cheerio.load(html);

        game_html = $.html();
        game_html += `
        <script>
            var test = document.getElementById('test_bg');
        `;
    });

    var sql;

    // 선택한 집 정보 가져오기
    var num = select_house.substring(5);
    console.log("num " + num);

    // 주인이 있는 집인지 아닌지 확인
    if(nick_house[num-1].nickname.length != 0){
        console.log('ddd');
        sql = 'SELECT question_1, question_2 FROM townGame where house="' + select_house + '"';
    }else{
        sql = 'SELECT * FROM example_game order by rand() limit 1';
    }

    conn.query(sql, function(err, results, field){
        console.log(results);
        q1 = results[0].question_1;
        q2 = results[0].question_2;
        q_ans = Math.floor((Math.random() * 2) + 1);
        console.log(q_ans);
    });    
    
    setTimeout(function(){

        // 문제 추가
        game_html += `
            test.innerHTML += '<span style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:30px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">${q1} VS ${q2}</span>';
        `;
        game_html += `
            </script>
        `;

        res.send(game_html);
    }, 500);

});

// 글쓰기 라우팅 함수
router.route('/process/send').post(function(req, res){
    console.log('/process/send 호출됨');

    var message = req.body.message || req.query.message;
    var check = true;
    var ko;

    console.log(message);

    // 빈칸 체크
    check = filtering.filter_func.checkBlank(message);
    if(check != true){
        res.send("<script>alert('" + check + "'); history.back();</script>");
    }

    // 따옴표 제거
    message = filtering.filter_func.delQuotes(message);

    // 자음/모음 확인
    ko = filtering.filter_func.warningWord(message); 
    console.log("kr : " + ko);
    if(ko !== undefined){
        res.send("<script>alert('" + ko + "'); history.back();</script>");
        //check = false;
    }else{

        // 빈칸 체크
        check = filtering.filter_func.checkBlank(message);
        if(check != true){
            res.send("<script>alert('" + check + "'); history.back();</script>");
        }
        console.log(check);

        // 비속어 필터링
        var filtering_str = filtering.filter_func.delContent(message);
        console.log("filter : " + filtering_str);

        if(check){
            console.log(filtering_str)
            // DB에 글 저장
            var sql = 'INSERT INTO WRITING VALUES("' + filtering_str + '")';
            conn.query(sql, function(err, results){
                if(err) throw err;
            });

            res.redirect('/MirimWriting');
        };
    }
});

// TMI 라우팅 함수
router.route('/process/tmisend').post(function(req, res){
    console.log('/process/tmisend 호출됨');

    var paramTitle = req.body.title || req.query.title;
    var paramContent = req.body.content || req.query.content;
    var paramNickname = req.body.nickname || req.query.nickname;

    var chk_title;
    var chk_content;
    var chk_nickname;

    var ko_title;
    var ko_content;
    var ko_nickname;

    console.log(paramTitle + "  " + paramContent + "   " + paramNickname);

    // 빈칸 경우
    chk_title = filtering.filter_func.checkBlank(paramTitle);
    if(chk_title != true){
        res.send("<script>alert('" + chk_title + "'); history.back();</script>");
    }
    chk_content = filtering.filter_func.checkBlank(paramContent);
    if(chk_content != true){
        res.send("<script>alert('" + chk_content + "'); history.back();</script>");
    }
    chk_nickname = filtering.filter_func.checkBlank(paramNickname);
    if(chk_nickname != true){
        res.send("<script>alert('" + chk_nickname + "'); history.back();</script>");
    }

    // 따옴표 제거
    paramTitle = filtering.filter_func.delQuotes(paramTitle);
    paramContent = filtering.filter_func.delQuotes(paramContent);
    paramNickname = filtering.filter_func.delQuotes(paramNickname);

    // 자음/모음 확인
    ko_title = filtering.filter_func.warningWord(paramTitle);
    ko_content = filtering.filter_func.warningWord(paramContent);
    ko_nickname = filtering.filter_func.warningWord(paramNickname);

    if(ko_title === undefined && ko_content === undefined && ko_nickname == undefined){
        // 빈칸 체크
        chk_title = filtering.filter_func.checkBlank(paramTitle);
        chk_content = filtering.filter_func.checkBlank(paramContent);
        chk_nickname = filtering.filter_func.checkBlank(paramNickname);

        if(chk_title != true || chk_content != true || chk_nickname != true){
            res.send("<script>alert('내용을 입력해주세요'); history.back();</script>");
        }else{

            // 비속어 필터링
            var filtering_title = filtering.filter_func.delContent(paramTitle);
            var filtering_content = filtering.filter_func.delContent(paramContent);
            var filtering_nickname = filtering.filter_func.delContent(paramNickname);

            // DB에 내용 저장
            var sql = 'INSERT INTO TMI VALUES("' + filtering_title + '", "' + filtering_content + '", "' + filtering_nickname + '")';
            conn.query(sql, function(err, results){
                if(err) throw err;
            });

            res.redirect('/MirimTMI');            
        }
    }else{
        res.send("<script>alert('제목 : " + ko_title + "'); history.back();</script>");
        res.send("<script>alert('내용 : " + ko_content + "'); history.back();</script>");
        res.send("<script>alert('닉네임 : " + ko_nickname + "'); history.back();</script>");
    }   

});

// 미니 게임
router.route('/process/submitAnswer').post(function(req, res){

    var rand_answer;
    if(q_ans == 1){
        rand_answer = q1;
    }else if(q_ans == 2){
        rand_answer = q2;
    }
    
    // 정답이 맞는지 확인 후 유저 저장하기
    // 아닐 경우 타운으로 이동
    var user_answer = req.body.txt_answer || req.query.txt_answer;

    var chk = filtering.filter_func.checkBlank(user_answer);
    if(chk != true){
        res.send("<script>alert('" + chk + "'); history.back();</script>");
    }else{
        // 맞았을 경우
        if(user_answer == rand_answer){
            //res.send("<script>alert('정답!! 지금 집을 등록하러 갈까요?'); history.back(); </script>");
        
            res.redirect('/AddUser');
        }else{
            res.send("<script>alert('틀렸습니다!! 타운으로 이동합니다'); window.close();</script>"); 
        }
    }

});

router.route('/process/submitInfo').post(function(req, res){

    // 순서대로 학번, 닉네임, 질문1, 질문2, 정답
    var user_id = req.body.num || req.query.num;
    var nickname = req.body.nickname || req.query.nickname;
    var q1 = req.body.que1 || req.query.que1;
    var q2 = req.body.que2 || req.query.que2;
    var house = select_house

    var sql = 'UPDATE townGame SET user_id=?, nickname=?, question_1=?, question_2=? where house=?';
    var params = [user_id, nickname, q1, q2, house];
    conn.query(sql, params, function(err, results){
        if(err) console.log(err);
    })

    res.send("<script>window.close();</script>"); 
});

router.route('/process/house1').post(function(req, res){

    user_click_house = 'house1';

});

router.route('/process/house2').post(function(req, res){

    user_click_house = 'house2';

});

router.route('/process/house3').post(function(req, res){

    user_click_house = 'house3';

});

router.route('/process/house4').post(function(req, res){

    user_click_house = 'house4';

});

router.route('/process/house5').post(function(req, res){

    user_click_house = 'house5';

});

app.use('/', router);

http.createServer(app).listen(3000, function(){
   // console.log(__dirname);
});