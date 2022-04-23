const mysql = require('mysql');

// mysql 접속 설정
const conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : 'mirim',
    database : 'mirimforest_db'
});

conn.connect((err) => {
    if(err){
        console.log(err);
        conn.end();
        throw err;
    }else{
        console.log("DB 접속 성공");
    }
});