"use strict"

var mirim_percent = localStorage.getItem('mirim_percent');

let image = "../image/ResultTest_"; // 이미지 경로
let image_alt = "미림인 테스트"; // 이미지가 나올경우 대체 텍스트

ShowImage();

function ShowImage(){
    var result_bg = document.querySelector("#result_bg");

    if(mirim_percent < 0)
        mirim_percent = 0;

    switch(mirim_percent / 10){
        case 10: 
        case 9: result_bg.innerHTML = '<img src="../image/stu_100%.png">'; break;
        case 8: 
        case 7: result_bg.innerHTML = '<img src="../image/stu_80%.png">'; break;
        case 6: 
        case 5: result_bg.innerHTML = '<img src="../image/stu_60%.png">'; break;
        case 4: 
        case 3: result_bg.innerHTML = '<img src="../image/stu_40%.png">'; break;
        case 2: 
        case 1: result_bg.innerHTML = '<img src="../image/stu_20%.png">'; break;
        case 0: result_bg.innerHTML = '<img src="../image/stu_0%.png">'; break;
    }
}