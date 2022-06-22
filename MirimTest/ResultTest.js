"use strict"

var mirim_percent = localStorage.getItem('mirim_percent');

let image = "../image/"; // 이미지 경로
let image_alt = "%의 미림인"; // 이미지가 나올경우 대체 텍스트
let result_description = "";    // 캐릭터 설명

ShowImage();

function ShowImage(){
    var result_bg = document.querySelector("#result_bg");
    /*var result_bg = document.querySelector(image + 'ResultTest_bg.png');*/
    

    if(mirim_percent < 0)
        mirim_percent = 0;

    switch(parseInt(mirim_percent / 10)){
        case 10: 
        case 9: image += 'stu_100%.png'; result_description = '완벽한 미림인시네요!!!!!! 이제 떠나셔도 좋습니다'; break;
        case 8: 
        case 7: image += 'stu_80%.png'; result_description = '미림화가 많이 이루어진 시기일까요? 후훗'; break;
        case 6: 
        case 5: image += 'stu_60%.png'; result_description = '프로젝트 때문에 많이 힘들죠.. 화이팅!'; break;
        case 4: 
        case 3: image += 'stu_40%.png'; result_description = '삐약삐약, 병아리를 이제 막 벗어났군요..'; break;
        case 2: 
        case 1: image += 'stu_20%.png'; result_description = '엇! 외부에서 오신 손님인가요??'; break;
        case 0: image += 'stu_0%.png'; result_description = '죄송하지만 혹시... 1학년이신가요?'; break;
    }

    // img 태그 추가
    var img = document.createElement('img');
    img.src = image;
    img.style.width = '370px';
    img.style.marginTop = '400px';
    img.style.marginLeft = '450px';
    img.alt = mirim_percent + image_alt;
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
}