// 전송 버튼 클릭 시 => 화면에 출력, DB에 저장
function clickMsg(){
    const message = document.getElementById('msg').value;

    showMessage(message);
}

// 화면에 글 출력
function showMessage(message){
    var chatView = document.querySelector("#chatView");

    chatView.innerHTML += '<div style=" width:auto; height: 80px; margin-left:2%; margin-top:1%; font-size:30px; font-weight: 600; line-height: 78px; padding-left:1%; padding-right:1%; background-color:white; border-radius:10px">'+message+'</div>';    
/*
    var message = document.getElementById('msg').value; 
    msg.value='';
    return true;
*/
}

