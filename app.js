/*
var http = require("http");
 
function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}
 
var server = http.createServer(onRequest);
server.listen(8080);

console.log(">>> SERVER STARTED");
*/
/*
var http = require("http");
 
//function onRequest(request, response) {
//  response.writeHead(200, {"Content-Type": "text/plain"});
//  response.write("Hello World");
//  response.end();
//}

var driver = require('couchbase');
var cb = new driver.("localhost:8091", null, null, "default");
var baseview = require('baseview')({url: 'http://127.0.0.1:8092',bucket: 'default'});


function onRequest(request, response) {
 response.writeHead(200, {
  "Content-Type": "text/plain"
 });
 response.write("See list of employees in the console");
 var params = { 'descending'  : 'true', 'include_docs' : 'true' };
 baseview.view('beer-sample', 'beer-sample', params, function(error, data) {
    for( var i = data.rows.length-1,length = data.rows.length ; i >= 0; i-- ) {
    var employee = data.rows[i].doc.json;
    console.log(employee);  
   }
  });  
 response.end();
}


//function insertData() {
// //create a new view
// baseview.setDesign('design_employees', {
//  'basic_list': {
//   'map': "function (doc, meta) { if(doc.type == 'employee') {emit(meta.id, doc.name);}}"
//  }
// }, function(err, res) {
//  if (err != null) console.log(err);
// });
// 
// // insert employees in Couchbase
// var emps = [{
//  "type": "employee",
//  "id": 100,
//  "name": "Thomas",
//  "dept": "Sales",
//  "salary": 5000
// }, {
//  "type": "employee",
//  "id": 200,
//  "name": "John",
//  "dept": "Development",
//  "salary": 4500
// }, {
//  "type": "employee",
//  "id": 300,
//  "name": "Jane",
//  "dept": "Marketing",
//  "salary": 5000
// }]
//
//// Insert the data in Couchbase using the add method ()
// for (index = 0; index < emps.length; index++) {
//  cb.add(JSON.stringify(emps[index].id), JSON.stringify(emps[index]), 0, undefined, function(data, err, key, cas) {
//   if (err && err != 12) { // 12 : LCB_KEY_EEXISTS 
//    console.log("Failed to store object:\n" + err);
//   }
//  });
// }
//}
 
var server = http.createServer(onRequest);
 
server.listen(8080, insertData());
 
console.log(">>> SERVER STARTED AT PORT 8080");

*/
 
//var server = http.createServer(onRequest);
//server.listen(8080);
//
//console.log("> SERVER STARTED");

/*
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var http = require('http');
var server = http.createServer(app);
console.log(server); 
var io = require('socket.io').listen(server);
var driver = require('couchbase');
 
driver.connect({
    "username": "Administrator",
    "password": "786ab786",
    "hostname": "localhost:8091",
    "bucket": "default"
},
function(err, couchbase) {
    if (err) {
        throw (err)
    }
 
    server.listen(8080);
 
    app.get('/', function(req, res) {
        res.sendfile(__dirname + '/public/pages/index.html');
    });
// Application code
// Socket.io events
});
*/

/*
var couchbase = require("couchbase");
var bucket = new couchbase.Cluster({
  'bucket':'beer-sample',
  'host':'127.0.0.1:8091',
  'username':'Administrator',
  'password':'786ab786'
}, function(err) {
  if (err) {
    // Failed to make a connection to the Couchbase cluster.
    throw err;
  }

  bucket.get('aass_brewery-juleol', function(err, result) {
    if (err) {
      // Failed to retrieve key
      throw err;
    }

    var doc = result.value;
    console.log(doc);
    console.log(doc.name + ', ABV: ' + doc.abv);

    doc.comment = "Random beer from Norway";

    bucket.replace('aass_brewery-juleol', doc, function(err, result) {
      if (err) {
        // Failed to replace key
        throw err;
      }

      console.log(result);

      // Success!
      process.exit(0);
    });
  });
});

*/
//App Server Using Couchbase Server

var express = require('express'),
bodyParser = require('body-parser'),
app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

var oauth2 = require('simple-oauth2')({
    clientID: 'abc1',
    clientSecret: '12345',
    site: 'http://localhost:9000',
    tokenPath: '/oauth/access_token'
});

var query;
var couchbase = require("couchbase");
var ViewQuery = couchbase.ViewQuery;
var n1ql = couchbase.N1qlQuery;
var myCluster = new couchbase.Cluster('couchbase://localhost');
var myBucket = myCluster.openBucket('default');

myBucket.get('attendance::user::6::1', function(err, res) {
    console.log('Name: ', res.value.firstName+' '+res.value.lastName);
//  console.log('Value: ', res);

});

//myBucket.getMulti(['attendance::user::6::1','attendance::user_attendance::6::1'], function(err, results) {
//  for(key in results) {
//    console.log(key+':'+results[key]);
//}
//});

//query = ViewQuery.from('dev_attendance', 'attendance_report').limit(3);
query = n1ql.fromString("select * from user_attendance");
myBucket.query(query, function(err, results) {
    if(err)
        console.log(err);
    for(i in results) {
        console.log('Attendance:', results[i].value);
    }
});


app.get('/', function (req, res) {
    // Will require a valid access_token
    console.log("hello!");
    res.sendFile(__dirname + '/public/pages/index.html');
});

// Handle login
app.post('/signin',  function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    oauth2.password.getToken({
        username: username,
        password: password 
    }, saveToken);
    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error);
            token = oauth2.accessToken.create(error);
            res.send(token.token);
        }
        else {
        
            token = oauth2.accessToken.create(result);
            if (token.expired()) {
                token.refresh(function(error, result) {
                    token = result;
                })
            }
            res.send(token.token);
        }
    }
});


app.get('/roles',function (req, res, next){
    oauth2.api('GET','/oauth/authorise',{
        access_token: token.token.access_token
        
    },function (err, data) {
//        console.log(token.token.access_token);
//        console.log("Error on your next call",err, data);
        if(err)
            res.send(err);
        else next();
    }
    );
},function (req, res, next) {
    res.send({
        id:1,
        roles: []
    })
//    console.log(next());
});


app.get('/api/employee', function (req, res) {

    query = ViewQuery.from('dev_employee', 'basic_list');
    myBucket.query(query, function(err, results) {
        if(err)
            console.log(err);
        for(i in results) {
            console.log('Employee:', results[i].value);
            
        }
        var data = results || [];
        res.json({
            data : data,
            status:true
        });
    });

});


app.get('/api/employeeattendence/report', function (req, res) {
    console.log(req.query);
    query = ViewQuery.from('dev_attendance', 'attendance_report').limit(10);
    myBucket.query(query, function(err, results) {
        if(err)
            console.log(err);
        for(i in results) {
            console.log('Attendance:', results[i].value);
        }
        var data = results || [];
        res.json({
            data : data,
            status:true
        });
    });

});

app.listen(8080);