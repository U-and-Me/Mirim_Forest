"use strict"

var mirim_percent = localStorage.getItem('mirim_percent');

let image = "../image/"; // 이미지 경로
let image_alt = "미림인 테스트"; // 이미지가 나올경우 대체 텍스트

ShowImage();

function ShowImage(){
    var result_bg = document.querySelector("#result_bg");

    if(mirim_percent < 0)
        mirim_percent = 0;

    switch(mirim_percent / 10){
        case 10: 
        case 9: image += 'stu_100%.png'; break;
        case 8: 
        case 7: image += 'stu_80%.png'; break;
        case 6: 
        case 5: image += 'stu_60%.png'; break;
        case 4: 
        case 3: image += 'stu_40%.png'; break;
        case 2: 
        case 1: image += 'stu_20%.png'; break;
        case 0: image += 'stu_0%.png'; break;
    }

    // img 태그 추가
    var img = document.createElement('img');
    img.src = image;
    img.style.width = '370px';
    img.style.marginTop = '100px';
    img.style.marginLeft = '500px';

    result_bg.appendChild(img);
}