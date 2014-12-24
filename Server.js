/*

var http = require('http');

var server = http.createServer(function (request, response) 
{
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
});
server.listen(9000);
console.log('Server running at http://127.0.0.1:9000/');

 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
server.listen(9000);
var bodyParser = require('body-parser');
var multer = require('multer'); 
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

//app.set('views', 'views');
//app.set('view engine', 'ejs');
//app.get('/', function (req, res) {
//  res.sendFile(__dirname + '/Test.html');
//});
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/pages/index.html');
});

app.post('/SignIn', function(req, res){
    var username=req.body.username;
    var password=req.body.password;
    var sql= 'select * from users where username= ? and password=?';
    
    var connection = require('./mysqlconnection.js');
    
    //if(username.length>1 || password.length>1)
    //{
    console.log( req.body);//display user input values on server side
    connection.query(sql, [username,password],function(err, result)
    {
        console.log(result);
        if(result=='')
        {
            res.redirect('/SignIn');
        }
        else
        {
            res.redirect('/Home'); 
        //res.sendFile(_dirname+'/SignIn.html')
        }
    }
    );
//connection.end();
});
       
app.post('/Home', function (req, res){
    console.log(req.body);
    var connection=require('./mysqlconnection.js')
    var sqlquery;
    var newusername=req.body.newusername;
    var newpassword=req.body.newpassword;
        
    if(newusername != null && newpassword != null)
    {
        if(req.body.action=='insert')
        {
            sqlquery='insert into users (username,password) values('+connection.escape(newusername)+','+connection.escape(newpassword)+')';
        //console.log("Congratulations");
        //res.redirect('/Home');
        }
        else if(req.body.action=='update')
        {
            sqlquery='update users set password='+connection.escape(newpassword)+'where username='+ connection.escape(newusername);
        //+connection.escape(newusername);    
        //+connection.escape(newpassword)+'
        }
        else if(req.body.action=='delete')
        {
            sqlquery='delete from users where username='+connection.escape(newusername)+'and password='+connection.escape(newpassword);
        }
        else{
            res.send("Wrong Action Input");
        }
        
        connection.query(sqlquery,function(err,result)
        {
            console.log(result);
            if(result==' ')
            {
                    
                res.send('Database is not updated! Please put right information!')
            }
            else
            {
                //console.log(result);
                res.send('Database is Updated!')
            }
    
        })
    }
    else 
    {
        console.log("Username or Password field is empty");
        res.send("Username or Password field is empty");
    }
//res.send("Congratulatios!!! You Have Successfully Login!"); 
//res.redirect('/Home');
// connection.end();
});
      
//connection.end();
