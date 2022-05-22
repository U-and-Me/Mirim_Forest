var db_config = require('../index_db');
var dbconn = db_config.init();

bringData();

// 전송 버튼 클릭 시 => 화면에 출력, DB에 저장
function clickMsg(){
    const message = document.getElementById('msg').value;

    console.log(message);

    //saveData(message);
    showMessage(message);
}

// 화면에 글 출력
function showMessage(message){
    var chatView = document.querySelector("#chatView");

    chatView.innerHTML += '<span style=" margin-left:1%; width:68px; font-size:30px;">'+message+'</span>';
}

// DB에 저장
function saveData(message){
    conn.query('INSERT INTO WRITING(user_write) VALUES("' + message + '")', function(err, results, fiels){
        console.log(arguments);
    });
}

// 페이지 로딩 시 글짓기 데이터 가져와서 출력
function bringData(){
    var sql = 'SELECT * FROM WRITING';
/*
    dbconn.query(sql, function(err, results, field){
        console.log(arguments);
    });*/
}