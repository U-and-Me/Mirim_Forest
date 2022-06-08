//bringData();

// 전송 버튼 클릭 시 => 화면에 출력, DB에 저장
function clickMsg(){
    const message = document.getElementById('msg').value;

    //saveData(message);
    showMessage(message);
}

// 화면에 글 출력
function showMessage(message){
    var chatView = document.querySelector("#chatView");

    chatView.innerHTML += '<div style=" width:auto; height: 80px; margin-left:2%; margin-top:1%; font-size:30px; font-weight: 600; line-height: 78px; padding-left:1%; padding-right:1%; background-color:white; border-radius:10px">'+message+'</div>';

    
}

// DB에 저장
function saveData(message){
   /* dbconn.query('INSERT INTO WRITING(user_write) VALUES("' + message + '")', function(err, results, fiels){
        console.log(arguments);
    });*/
}

// 페이지 로딩 시 글짓기 데이터 가져와서 출력
function bringData(){
    var sql = 'SELECT * FROM WRITING';

    conn.query(sql, function(err, results, field){
        console.log(arguments);
    });
}