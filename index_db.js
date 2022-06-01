const mysql = require('mysql');
var db_config = require('./.config.json');

// mysql 접속 설정
const conn = mysql.createConnection({
    host : db_config.host,
    port : '3306',
    user : db_config.user,
    password : db_config.password,
    database : db_config.database
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

function init(){
    return mysql.createConnection(conn);
}
