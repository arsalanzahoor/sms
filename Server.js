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

var app = require('express')();
var server = require('http').Server(app);
server.listen(9000);
var bodyParser = require('body-parser');
var multer = require('multer'); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/a', function(req, res){
    
    
    console.log( req.body);//display user input values on server side
    
    res.send(req.body); 
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

