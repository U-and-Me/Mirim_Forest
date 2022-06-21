var mysql = require('mysql');
var db_config = require('./.config.json');

var db = mysql.createConnection({
    host : db_config.host,
    port : '3306',
    user : db_config.user,
    password : db_config.password,
    database : db_config.database
});

db.connect();
module.exports = db;