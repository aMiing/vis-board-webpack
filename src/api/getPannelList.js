var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var url = require('url');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var  sql = 'SELECT * FROM user where ug_id=59';

//var callback = $_GET['callback'];
connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
   return (result);
});
 
connection.end();
			