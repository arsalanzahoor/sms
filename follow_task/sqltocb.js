var mysql = require('mysql');
var request = require('request');
var express = require('express'),
bodyParser = require('body-parser'),
async = require('async'),
app = express();

app.use(bodyParser());


var connection = mysql.createConnection({
    host     : '192.168.1.40',
    user     : 'root',
    password : '051D5101bin85db'
});
connection.query('USE v2_main');
var url = 'http://dev:dev@localhost:4985/db/_user';
var opt = {
    method: 'POST',
    
    //            form:(data),
    
    json : true
};
var q = async.queue(function (data, callback){
  
    data.channels = ['main'];
    opt.body = data;
    request(opt, function(e, a, b){
        callback();
        console.log(e,a.statusCode,b);
    })
}, 1);
var q2 = async.queue(function (data2, callback) {
    console.log(data2);
    opt.method = 'PUT';
    opt.url = url+data2;
    opt.body = {"disabled":false, "admin_channels":[data2, "main"], "name":data2, "password":data2};
    request(opt, function(e, a, b){
        callback();
        console.log(e,a.statusCode,b);
    })
}, 1);
var user = ['v2_kohsar','v2_dha','v2_gulberg','v2_main','v2_warehouse'];
q2.push(user);
//connection.query('SELECT pkcustomerid AS customerid,companyname AS customername,email,phone FROM customer', function(err, result) {
//connection.query('SELECT pksupplierid AS supplierid, companyname AS suppliername FROM supplier Where supplierdeleted=0', function(err, result) {
//connection.query('Select pkaddressbookid AS userid,username,password,loginallowed+1 AS status from addressbook left join employee on fkaddressbookid = pkaddressbookid where loginallowed=0 AND employeedeleted=0', function(err, result) {
//   if(!err)
//   q.push(result)
//else console.log(err)
//})


//app.listen(3000);