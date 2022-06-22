const express	= require('express');
const mysql     = require('mysql');
const db 	= require('./db.js');
const app 	= express();
// configuration =========================

var http = require('http');
var path = require('path');
var static = require('serve-static');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

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
app.use('/ResultTest', static(path.join(__dirname, '/MirimTest')));

// 필터링
var filtering = require('./.filter');

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

app.get('/Help', function(req, res){
    res.sendFile(__dirname + '/Help/help.html');
});

app.get('/ResultTest', function(req, res){
    
    var result_html;
    
    fs.readFile('./MirimTest/ResultTest.html', 'utf-8', (err, data) => {
        result_html = data;

        result_html += `
        <script>
            var mirim_percent = localStorage.getItem('mirim_percent');
            let image = '../image/';
            let image_alt = "%의 미림인"; // 이미지가 나올경우 대체 텍스트
            let result_description = "";    // 캐릭터 설명
            var case_percent;   
            var result_bg = document.querySelector("#result_bg");

            if(mirim_percent < 0)
                mirim_percent = 0;
            else
                case_percent = parseInt(mirim_percent) / 10;
           
            var img = document.createElement('img');

            switch(parseInt(case_percent)){
                case 10: 
                case 9: img.src = '../image/stu_100.png'; result_description = '완벽한 미림인시네요!!!!!! 이제 떠나셔도 좋습니다'; break;
                case 8: 
                case 7: img.src = '../image/stu_80.png'; result_description = '미림화가 많이 이루어진 시기일까요? 후훗'; break;
                case 6: 
                case 5: img.src = '../image/stu_60.png'; result_description = '프로젝트 때문에 많이 힘들죠.. 화이팅!'; break;
                case 4: 
                case 3: img.src = '../image/stu_40.png'; result_description = '삐약삐약, 병아리를 이제 막 벗어났군요..'; break;
                case 2: 
                case 1: img.src = '../image/stu_20.png';  result_description = '엇! 외부에서 오신 손님인가요??'; break;
                case 0: img.src = '../image/stu_0.png'; result_description = '죄송하지만 혹시... 1학년이신가요?'; break;
            }
            
            // img 태그 추가
            
            img.style.width = '370px';
            img.style.marginTop = '400px';
            img.style.marginLeft = '450px';
            img.alt = parseInt(mirim_percent) + image_alt;
            console.log(img.src);
            result_bg.appendChild(img);

            // 설명 추가
            var span = document.createElement('span');
            span.textContent = mirim_percent + '%의 미림인';
            span.style.position = 'absolute';
            span.style.marginLeft = '-370px'; // 글씨 위치
            span.style.marginTop = '200px';

            // 폰트 설정
            span.style.fontSize = '60px';
            span.style.fontWeight = 'bolder';
            span.style.color = '#051C1E';

            result_bg.appendChild(span);

            // 설명 추가
            var span_des = document.createElement('span');
            span_des.textContent = result_description;
            span_des.style.position = 'absolute';
    
            span_des.style.marginLeft = '-18%'; // 글씨 위치
            span_des.style.marginTop = '300px';

            // 폰트 설정
            span_des.style.fontSize = '30px';
            span_des.style.fontWeight = 'bold';
            span_des.style.color = '#051C1E';

            result_bg.appendChild(span_des); 
            </script>   
        `;
    
        res.send(result_html);
    

    });
})

var html_write;

app.get('/MirimWriting', function(req, res){
    console.log("이어서 글짓기");

    html_write = null;

    fs.readFile('./MirimWriting/writing.html', 'utf-8', (err, data) => {
        html_write = data;

        html_write += `
            <script>
                var chatView = document.querySelector("#chatView");
        `;

        // DB 글 가져오기
        var sql = 'SELECT * FROM writing';
        var write = {};
        var i = 0;

        db.query(sql, function(err, results, field){
            write = results;

            while(i < write.length){
                html_write += `
                chatView.innerHTML += '<span style=" width:auto; height: 80px; margin-left:2%; margin-top:1%; font-size:30px; font-weight: 600; line-height: 78px; padding-left:1%; padding-right:1%; background-color:white; border-radius:10px">🗣 ${write[i].user_write}</span>';    
                
                chatView.scrollBy(0, chatView.scrollHeight);
                
                var message = document.getElementById('msg').value; 
                msg.value='';
                `;
    
                i++;
            }
            html_write += `
                </script>
            `;
                    res.send(html_write);
        });
    

    })
});

var html_tmi;

app.get('/MirimTMI', function(req, res){
    console.log("오늘 나의 TMi");

    html_tmi = null;

    fs.readFile('./MirimTMI/tmi.html', 'utf-8', (err, data) => {
        html_tmi = data;

        html_tmi += `
            <script>
            var tmiView = document.querySelector("#tmiView");
        `;

        
        // DB 글 가져오기
        var sql = 'SELECT * FROM tmi';
        var tmi = {};
        var i = 0;

        // 콘솔로 보기
        db.query(sql, function(err, results, field){
            tmi = results;

            while(i < tmi.length){
                var title = tmi[i].title;
                var content = tmi[i].content;
                var nickname = tmi[i].nickname;

                content = content.replace("\r", "");
                if(content.includes('\n')){
                    var arr = content.split('\n');
                    content = arr[0];
                    for(let j = 1; j < arr.length; j++){
                        arr[j] = arr[j].replace("\r", "");
                        content += " " + arr[j];
                    }
                }

                html_tmi += 
                `
                    tmiView.innerHTML += '<div id="tmitest" style="margin-left:5%; width:auto; height: auto; background-color:#2A671C" > </div>';

                    var tmitest = document.getElementById('tmitest');
                
                    tmitest.innerHTML += '<span style="width:700px; height: 80px; margin-top:5%; margin-left:5%; font-size:30px; font-weight: 800; color: black; line-height: 78px; padding-left:3%; padding-top:16px; padding-bottom:28px; padding-right:3%; background-color:#fffcab; border-radius:10px 0px 0px 10px">${title}</span>';    
                    tmitest.innerHTML += '<span style="width:700px; height: 80px; margin-top:5%; font-size:30px; font-weight: 600; color: black; line-height: 78px; padding-left:4%; padding-right:4%; padding-top:16px; padding-bottom:28px; background-color:#fffcab; ">${content}</span>';    
                    tmitest.innerHTML += '<span style="width:700px; height: 80px; margin-top:5%; font-size:30px; font-weight: 800; color: black; line-height: 78px; padding-left:3%; padding-right:3%; padding-top:16px; padding-bottom:28px; background-color:#fffcab; border-radius: 0px 10px 10px 0px">${"TMI 작성자 : " + nickname}<br></span>'; 
                    tmitest.innerHTML += '<span style="width:700px; height: 80px; margin-left:5%; margin-top:1%; font-size:20px; font-weight: 800; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">${"     "}<br></span>';
                `;
                i++;
            }

            html_tmi += 
            `
            
                </script>
            `;
	        res.send(html_tmi);
        });   

    })    
});


var user_click_house;

var town_html;
var nick_house;
app.get('/Game_town', function(req, res){

    town_html = null;

    // 집주인 있을 경우 닉네임 보여주기
    fs.readFile('./Game_town/town.html', 'utf-8', (err, data) => {
        town_html = data;

        town_html += `
        <script>
            var houses = [];
            for(let i = 1; i < 6; i++){
                var house = 'house' + i.toString();
                houses[i-1] = document.getElementById(house);
            }
        `;

        
        var sql = 'SELECT nickname, house FROM towngame';

        db.query(sql, function(err, results, field){
            nick_house = results;

            for(let i = 0; i < nick_house.length; i++){
                if(nick_house[i].nickname.length == 0){
                    town_html += `houses[${i}].innerHTML += '<span  style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:30px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">주인없음</span>';`;
                }else{
                    town_html += `houses[${i}].innerHTML += '<span  style="width:auto; height: 80px; margin-left:5%; margin-top:1%; font-size:30px; font-weight: 600; color: white; line-height: 78px; padding-left:1%; padding-right:1%; background-color:#2A671C; border-radius:10px">${nick_house[i].nickname}</span>';`;
                }
            }
            town_html += `
                </script>
            `;
		res.send(town_html);
        });  
    }) 
});

var q1, q2, q_ans;
var select_house; 
var game_html;
app.get('/MiniGame', function(req, res){
    
    select_house = user_click_house;
    game_html = null;

    // 페이지 읽어서 문제 보여주기
    fs.readFile('./Game_town/miniGame.html', 'utf-8', (err, data) => {
        game_html = data;

        game_html += `
            <script>
                var test = document.getElementById('test_bg');
        `;

        var sql;

	// 주인이 있는 집인지 아닌지 확인
	var num = select_house.substring(5);
        if(nick_house[num-1].nickname.length != 0){
            sql = 'SELECT question_1, question_2 FROM towngame where house="' + select_house + '"';
        }else{
            sql = 'SELECT * FROM example_game order by rand() limit 1';
        }

        db.query(sql, function(err, results, field){
            q1 = results[0].question_1;
            q2 = results[0].question_2;
            q_ans = Math.floor((Math.random() * 2) + 1);

            // 문제 추가
            game_html += `
                test.innerHTML += '<span style="position:absolute; width:auto; height: 80px; margin-left:10%; margin-top:10%; font-size:60px; font-weight: 600; color:392f31; line-height: 78px; padding-left:10%; padding-right:10%; top:40px; border-radius:10px">${q1} VS ${q2}</span>';
            `;

            game_html += `
                </script>
            `;
    
            res.send(game_html);
        });
    });
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
            var sql = 'INSERT INTO writing VALUES("' + filtering_str + '")';
            db.query(sql, function(err, results){
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
            var sql = 'INSERT INTO tmi VALUES("' + filtering_title + '", "' + filtering_content + '", "' + filtering_nickname + '")';
            db.query(sql, function(err, results){
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
            res.send("<script>alert('정답!! 지금 집을 등록하러 갈까요?'); location.href='/AddUser'; </script>");
        
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

    var chk_userid = filtering.filter_func.checkBlank(user_id);
    var chk_nickname = filtering.filter_func.checkBlank(nickname);
    var chk_q1 = filtering.filter_func.checkBlank(q1);
    var chk_q2 = filtering.filter_func.checkBlank(q2);

    if(chk_userid == true && chk_nickname == true && chk_q1 == true && chk_q2 == true){
        // 비속어 필터링
        if(filtering.filter_func.delContent(user_id).includes("❤") || filtering.filter_func.delContent(nickname).includes("❤") || filtering.filter_func.delContent(q1).includes("❤") || filtering.filter_func.delContent(q2).includes("❤")){
            res.send("<script>alert('🚨비속어가 감지되었습니다.'); history.back();</script>");
        }

        chk_userid = filtering.filter_func.checkBlank(user_id);
        chk_nickname = filtering.filter_func.checkBlank(nickname);
        chk_q1 = filtering.filter_func.checkBlank(q1);
        chk_q2 = filtering.filter_func.checkBlank(q2);

        if(chk_userid == true && chk_nickname == true && chk_q1 == true && chk_q2 == true){
            var sql = 'UPDATE towngame SET user_id=?, nickname=?, question_1=?, question_2=? where house=?';
            var params = [user_id, nickname, q1, q2, house];
            db.query(sql, params, function(err, results){
                if(err) console.log(err);
            })

            res.send("<script>window.close(); location.href='/Game_town'; </script>"); 
        }else{
            res.send("<script>alert('내용을 작성해주세요'); history.back();</script>");        
        }
    }else{
        res.send("<script>alert('내용을 작성해주세요'); history.back();</script>");        
    }

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

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

