// 중간에 테스트를 종료하려고 하는 경우
function chkClose(){
    let result = confirm("미니게임를 종료하시겠습니까?");
    
    // true일 경우 메인 페이지로 이동
    if(result){
        var link = '../index.html';
        location.href = link;
        location.replace(link);
        window.open(link);
    }
}