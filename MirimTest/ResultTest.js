"use strict"

var mirim_percent = localStorage.getItem('mirim_percent');

let image = "../image/ResultTest_"; // 이미지 경로
let image_alt = "미림인 테스트"; // 이미지가 나올경우 대체 텍스트

ShowImage();

function ShowImage(){
    if(mirim_percent < 0)
        mirim_percent = 0;

    switch(mirim_percent / 10){
        case 10: break;
        case 9: 
        case 8: break;
        case 7:
        case 6: break;
        case 5:
        case 4: break;
        case 3:
        case 2: break;
        case 1:
        case 0: break;
    }

    console.log(mirim_percent);
    console.log("dddd");

    /*
    var result_image = document.createElement("img"); // 이미지 태그 생성
    result_image.src = image;
    result_image.alt = image_alt;

    var result_bg = document.querySelector("#result_bg");
    result_bg.innerHTML(result_bg);

    */

}