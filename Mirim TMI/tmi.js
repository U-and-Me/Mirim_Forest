"use strict"

/*
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
*/

var temp;

function title_txtbox() {
    var title_txtbox = document.getElementById("title_txtbox").value;
    temp = title_txtbox;
}

function text_txtbox() {
    document.getElementById("text_txtbox").value = temp;
}


