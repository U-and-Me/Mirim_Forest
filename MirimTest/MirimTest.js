"use strict"

// 테스트 질문
let question = {
    1 : '국어 선생님의 성함은 이대[ ]?',
    2 : '과학실은 몇 층에 있을까요?',
    3 : '우리 학교 교무실의 개수는?',
    4 : '우리 학교 체육선생님은 몇 분이 계실까요?',
    5 : '과학, 음악, 자바는 2학년때 배우는 과목이다.',
    6 : '미림은 1993년도에 설립되었다.',
    7 : '학교 전화번호 X에 알맞은 숫자는? : 02-87X-4071',
    8 : '학교 도서관은 무인으로 대여가 가능하다.',
    9 : '송민정 선생님께서는 미림에 10년 넘게 계셨었다.',
    10 : '상상카페에서 음료 섭취는 가능하다.',
    11 : '우리 학교 실습실은 총 6개이다.',
    12 : '올해 1학년 체육복 색은?',
    13 : '미림 학생회 공식 인스타가 있다.',
    14 : '학교에서 돌하르방을 본 적이 있다.',
    15 : '1학년 때만 배우는 과목은?',
    16 : '점심 시간은 언제일까요?',
    17 : '올해 아이티쇼 주제는 "일상"이다.',
    18 : '호걸쌤이 산을 오르시면?',
    19 : '우리 학교는 노트북 대여가 가능하다.',
    20 : '음악실은 본관 2층에 있다.',
    21 : 'IT Show는 목, 금, 토 3일 동안 진행된다',
    22 : 'IT Show 외부인도 함께 즐기는 축제이다'
}

// 테스트 정답
let answer_o = {
    1 : '형',
    2 : '2층',
    3 : '5개',
    4 : '두 명',
    5 : 'O',
    6 : 'X',
    7 : '2',
    8 : 'O',
    9 : 'O',
    10 : 'X',
    11 : 'X',
    12 : '연두색',
    13 : 'O',
    14 : 'O',
    15 : '한국사',
    16 : '12시 20분',
    17 : 'X',
    18 : '산중호걸',
    19 : 'O',
    20 : 'X',
    21 : 'O',
    22 : 'O'
}

// 테스트 오답
let answer_x = {
    1 : '영',
    2 : '3층',
    3 : '4개',
    4 : '한 명',
    5 : 'X',
    6 : 'O',
    7 : '1',
    8 : 'X',
    9 : 'X',
    10 : 'O',
    11 : 'O',
    12 : '하늘색',
    13 : 'X',
    14 : 'X',
    15 : '과학',
    16 : '12시 30분',
    17 : 'O',
    18 : '하산호걸',
    19 : 'X',
    20 : 'O',
    21 : 'X',
    22 : 'X'
}

let tot_ans = Object.keys(question).length;    // 총 질문 수
let cur_qus = 1; // 현재 테스트 질문
let qus_arr = []; // 랜덤 질문 배열
let cur_ind = 0; // 현재 질문 인덱스
let random_quiz; // 답 랜덤 위치
let margin_Left = 50; // 현재 위치를 보여주기 위한 마진
var mirim_percent = 0;  // 미림인 퍼센트

RandomQuestion();

// 랜덤 질문 생성
function RandomQuestion(){
    for(let i = 0; i < tot_ans; i++){
        let index = Math.floor(Math.random() * tot_ans) + 1;
        qus_arr.push(index);

        for(let j = 0; j < i; j++){ // 중복 제거
            if(qus_arr[j] == qus_arr[i]){
                i--;
                qus_arr.pop();
                break;
            } 
        }
    }
}

Test();

// 테스트하기
function Test(){
    if(cur_ind < 20){
        if(cur_ind > 0)
            CurPosition();
       ShowQuestion();
    }else{ // 테스트가 끝났을 경우 결과 화면으로 이동
        localStorage.setItem("mirim_percent", mirim_percent);
        var link = 'ResultTest.html';
        location.href = link;
        location.replace(link);
        window.open(link);
    }
}

// 질문 보여주기
function ShowQuestion(){
    var qus_span = document.querySelector("#question");
    var ans_left = document.querySelector("#ans_left");
    var ans_right = document.querySelector("#ans_right");

    // 질문
    qus_span.innerHTML = '<span style="width:auto; height:auto; font-size:70px; font-weight:bold;">Q'+(cur_ind+1)+'. </br></br>'+question[qus_arr[cur_ind]]+'</span>';
        
    random_quiz = Math.floor((Math.random() * 2));

    // 답
    if(random_quiz % 2 == 0){
        ans_left.innerHTML = '<span style="font-size:100px; font-weight:bold; color:#402B26;">'+answer_o[qus_arr[cur_ind]]+'</span>';
        ans_right.innerHTML = '<span style="font-size:100px; font-weight:bold; color:#402B26;">'+answer_x[qus_arr[cur_ind]]+'</span>';
    }else{
        ans_left.innerHTML = '<span style="font-size:100px; font-weight:bold; color:#402B26;">'+answer_x[qus_arr[cur_ind]]+'</span>';
        ans_right.innerHTML = '<span style="font-size:100px; font-weight:bold; color:#402B26;">'+answer_o[qus_arr[cur_ind]]+'</span>';
    }        
}

// 정답 체크
function chkAnswer(user_ans){
    if(random_quiz % 2 == 0){
        if(user_ans == 1){ // 정답
            mirim_percent += 5;
        }else{ // 오답
            mirim_percent -= 5;
        }
    }else{
        if(user_ans == 2){ // 정답
            mirim_percent += 5;
        }else{ // 오답
            mirim_percent -= 5;
        }
    }

    cur_ind++; // 다음 질문

    Test();
}

// 중간에 테스트를 종료하려고 하는 경우
function chkClose(){
    let result = confirm("정말로 테스트를 종료하시겠습니까?");
    
    // true일 경우 메인 페이지로 이동
    if(result){
        var link = '../index.html';
        location.href = link;
        location.replace(link);
        window.open(link);
    }
}

// 현재 위치 보여주기
function CurPosition(){
    var pos = document.getElementById('position').style.marginLeft = margin_Left+'px';

    margin_Left += 51;
}
