"use strict"

var temp;

function input(){
    var input = document.getElementById("input").value;
    temp = input;
}

function output(){
    document.getElementById("output").value = temp;
}


/*
var button1; //전역변수 선언
var count=0;
window.onload=function(){

button1=document.getElementById("button1"); //초기화  
    
    m = function makeImg() {
        count++;
        img = document.createElement("img");
        img.src="http://cdn.redmondpie.com/wp-content/uploads/2011/05/Angry-Birds.png"
        img.width = "100"; 
        img.height = "100";
        document.body.appendChild(img);
        if(count > 10){
            clearInterval(auto);
        }
    }

    t = function () {
        setTimeout(m, 500); // 0.5초 뒤 m 실행
        auto = setInterval(m, 200); // 1초마다 m을 실행
    } // 10번 실행하면 멈추도록 만들어 보세요

    button1.onclick = t; // 클릭하면 t 실행
    button2.onclick = function() {
        clearInterval(auto);
    }
}
*/
/* var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
*/