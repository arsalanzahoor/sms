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
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/Home', function (req, res) {
    res.sendFile(__dirname + '/Home.html');
});
app.get('/SignIn', function (req, res) {
    console.log(req.query);
    res.sendFile(__dirname + '/SignIn.html');
    //res.render('SignIn',{message:"Please Insert Details Again"});
});
app.post('/SignIn', function(req, res){
    var username=req.body.username;
    var password=req.body.password;
    //if(username.length>1 || password.length>1)
    //{
        console.log( req.body);//display user input values on server side
        if(username==='admin' && password==='admin')
        {
            
            //app.post('/Home', function (req, res){
            //res.send("Congratulatios!!! You Have Successfully Login!"); 
            //res.sendFile(__dirname + '/Home.html');
            res.redirect('/Home');
            //});
        }
        else
        {
            res.redirect('/SignIn?message=1'); 
        //res.sendFile(_dirname+'/SignIn.html')
        }

    //}
    //else
    //{
      //  res.send("Username or Password Field Is Empty")
    //}
    
//res.send(req.body); 
/*
    if(req.body.valueOf()=='{ }')
        {
            res.send("Sorry You Didn't Enter Any Rocords!"); 
        }
        else
            {
                res.send("Congratulatios!!! You Have Successfully Registered!"); 
            }
    //sending the reponse after submission
    */
});

