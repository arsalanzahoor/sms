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
var moment = require('moment');
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

var config = {
    connstr : "127.0.0.1",
    bucket : 'default',
    "operationTimeout": 5000,
    "queryhosts": "127.0.0.1:8093"
}


var query;
var couchbase = require("couchbase");
var ViewQuery = couchbase.ViewQuery;
var N1qlQuery = couchbase.N1qlQuery;
var myCluster = new couchbase.Cluster(config.connstr);
var myBucket = myCluster.openBucket(config.bucket);
myBucket.enableN1ql(config.queryhosts);
var id = 'attendance::user::6::7';
myBucket.get(id, function(err, res) {
    var data = JSON.parse(res.value);
    console.log('Name: ', data.firstName+' '+data.lastName);
//    console.log(res.value.registrationDate);
//    console.log(mydate);
//  console.log('Value: ', res);
//
});
//myBucket.getMulti(['attendance::user::6::1','attendance::user::6::2','attendance::user::6::3'], function(err, results) {
//    for(i in results) {
//        console.log('Value:'+results[i].value);
//    }
//    var data = results || [];
//    res.json({
//        data : data,
//        status:true
//    });
//});

//query = ViewQuery.from('dev_attendance', 'average_attendance').group(true);
////query = N1qlQuery.fromString("SELECT Meta() from default limit 3)");
////query = N1qlQuery.fromString("SELECT date,time_in,time_out from default where doctype='user_attendance' and user_id='attendance::user::6::1' Order by date limit 3" );
////query = N1qlQuery.fromString("SELECT Count(*) as totalattendance from default where doctype='user_attendance' and date between '01/01/2015' and '01/31/2015' order by date");
////query = N1qlQuery.fromString("SELECT firstName,lastName from default where id='attendance::user::6::1'" );
////var data = [];
////data = 
//var firstname = 'sadiq';
//var lastname = 'Ahmad';
//var key = "attendance::user::6::1";
//var fromdate = '12/01/2014';
//var todate = '12/31/2014';
//var companyname = 'EsajeeSolutions';
//var registrationdate = '01/30/2015';
//var value = "demo_value"
//var values = {
//    'firstName':'testing', 
//    'lastName':'testing', 
//    'companyName':'Esajeesolutions', 
//    'registrationDate':'01/30/2015',
//    'fmd': 'null',
//    'status': '1',
//    'locatoin': '6',
//    'doctype': 'user',
//    'channels': ['attendance'],
//    'client': 'Esajee'
//}

//myBucket.insert(key, values, function(err, result) {
//    if(err)
//        console.log(err);
//    console.log('New Record: ',result);
//});

////
//query = N1qlQuery.fromString("UPDATE default use keys 'testing' set firstName='"+firstname+"',lastName='"+lastname+"'" );
//query = N1qlQuery.fromString("INSERT INTO default(KEY, VALUE) VALUES('"+empid+"',{firstName:'"+firstname+"', lastName:'"+lastname+"', companyName:'"+companyname+"', registrationDate:'"+registrationdate+"'}");
//query = N1qlQuery.fromString("INSERT into default(key,value) VALUES('test',{'firstName':'testing', 'lastName':'testing', 'companyName':'Esajeesolutions', 'registrationDate':'01/30/2015','fmd': 'null','status': '1','locatoin': '6','doctype': 'user','channels': ['attendance'],'client': 'Esajee'}");
//query = N1qlQuery.fromString("SELECT location from default where doctype='user' INTERSECT SELECT location from default where doctype='user_attendance'");
//query = N1qlQuery.fromString("SELECT user_id,date,time_in,time_out from default where doctype='user_attendance' and user_id='"+key+"' and date between '"+fromdate+"' and '"+todate+"'order by date");
//myBucket.query(query, function(err, results1) {
//    if(err)
//        console.log(err);
////    console.log(results1);
//    for(i in results1) {
//        //        var date = results1[i].date;
//        //        var datearray = dateToArray(date);
//        console.log('User:'+results1[i].date+' '+results1[i].time_in+' '+results1[i].time_out);
//    }
//});
//
//id = 'test';
//myBucket.get(id, function(err, res) {
//    console.log('Name: ', res.value.firstName+' '+res.value.lastName);
//});

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


//GETTING MONTHLY AVERAGE ATTENDANCE OF ALL EMPLOYEES FOR GRAPH ON HOME PAGE**********

app.get('/api/employeeattendance', function (req, res) {

    query = ViewQuery.from('dev_attendance', 'average_attendance').group(true);
    myBucket.query(query, function(err, results) {
        if(err)
            console.log(err);
        for(i in results) {
            console.log('Employee:', results[i]);
            
        }
        var data = results || [];
        res.json({
            data : data,
            status:true
        });
    });

});

//GETTING LIST OF ALL EMPLOYEES**********

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


//SEARCH EMPLOYEE RECORD BY GIVEN EMPLOYEE ID**********

app.get('/api/employee/:EmployeeID', function (req, res) {
    //    console.log(req.query);
    var employeeid = req.query.employeeid;
    query = N1qlQuery.fromString("SELECT meta(default).id as id,firstName,lastName,companyName,registrationDate from default where doctype='user' and META(default).id='"+employeeid+"'" );
    myBucket.query(query, function(err, results) {
        if(err)
            console.log(err);
        //        console.log(err,results);
        //        for(i in results) {
        //            console.log('Employee:', results[i]);
        //        }
        var data = results || [];
        res.json({
            data : data,
            status:true
        });
    });

});


//UPDATE SELECTED EMPLOYEE RECORD**********

app.put('/api/employee/:EmployeeID', function (req, res) {
    console.log(req.body);
    //    var employeeid = req.query.employeeid;
    query = N1qlQuery.fromString("UPDATE default use keys '"+req.body.employeeid+"' set firstName='"+req.body.firstname+"',lastName='"+req.body.lastname+"'");
    myBucket.query(query, function(err, results) {
        var data = results || [];
        if(err)
        {
            console.log(err);
            res.json({
                data : data,
                status:false
            });
        }
        else 
        {
            res.json({
                data : data,
                status:true
            });
        }
    });

});


//INSERT NEW EMPLOYEE RECORD

app.post('/api/employee', function (req, res) {
    console.log(req.body);
    //    var employeeid = req.query.employeeid;
    var key = 'test'
    var values = {
        'firstName':req.body.firstname, 
        'lastName':req.body.lastname, 
        'companyName':req.body.companyname, 
        'registrationDate':req.body.registrationdate,
        'fmd': 'null',
        'status': '1',
        'locatoin': '6',
        'doctype': 'user',
        'channels': ['attendance'],
        'client': 'Esajee'
    }

    myBucket.insert(key, values, function(err, result) {
        var data = result || [];
        if(err)
        {
            console.log(err);
            res.json({
                data : data,
                status:false
            });
        }
        else 
        {
            console.log(result);
            res.json({
                data : data,
                status:true
            });
        }
    });
});


//EMPLOYEES ATTENDANCE REPORT ON BASIS OF RANGE OF DATES AND WITHOUT DATES EXCLUDING EMPLOYEE NAMES***********

app.get('/api/employeeattendence/report', function (req, res) {
//    console.log(req.query);
    var fromdate = moment(req.query.fromdate).format('MM/DD/YYYY');
    var todate = moment(req.query.todate).format('MM/DD/YYYY');
    var employeeid = req.query.employeeid;
//        console.log(employeeid,fromdate,todate);
    if(employeeid != '' && fromdate!='Invalid date' && todate!='Invalid date')
        {
         query = N1qlQuery.fromString("SELECT user_id,date,time_in,time_out from default where doctype='user_attendance' and user_id='"+employeeid+"' and date between '"+fromdate+"' and '"+todate+"'order by date");   
        }
    else if(fromdate!='Invalid date' && todate!='Invalid date')
    {
        query = N1qlQuery.fromString("SELECT user_id,date,time_in,time_out from default where doctype='user_attendance' and date between '"+fromdate+"' and '"+todate+"'order by date");
    }
    else if(employeeid != '')
        {
            query = N1qlQuery.fromString("SELECT user_id,date,time_in,time_out from default where doctype='user_attendance' and user_id='"+employeeid+"' order by date"); 
        }
    else
    {
        //        console.log("test")
        query = N1qlQuery.fromString("SELECT user_id,date,time_in,time_out from default where doctype='user_attendance' Order by date" );
    }
    //    query = N1qlQuery.fromString("SELECT e.firstName,e.lastName,a.date,min(a.date) as timein,max(a.date) as timeout from default e,(SELECT * FROM default where doctype='user_attendance') a where e.user_id=a.user_id order by date" );
    //    query = N1qlQuery.fromString("SELECT e.firstName,e.lastName,a.user_id,a.date,a.time_in,a.time_out from default e,(SELECT * from default where doctype='user_attendance' and date between '"+fromdate+"' and '"+todate+"') a where e.meta(default).id=a.user_id group by firstName,lastName,user_id,date,time_in,time_out");
    myBucket.query(query, function(err, results) {
        //        var data = results || [];
        if(err)
            console.log(err);
        //        console.log(results);
        //        for(var i=0;i<results.length;i++) {
            
        //            console.log('Attendance:', results[i].user_id);
        //            var query1 = N1qlQuery.fromString("SELECT meta(default).id as id, firstName,lastName from default where meta(default).id='"+results[i].user_id+"'");
        //            //            myBucket.get(results[i].user_id, function(err, res) {
        //            //                results[i].user_id = res.value.firstName+' '+res.value.lastName;
        //            myBucket.query(query1, function(err, res) {
        //                for(r in res) {
        //                    //                    var name= res[r].firstName+' '+res[r].lastName;
        //                    console.log(res[r].firstName+' '+res[r].lastName);

        //                    data[r].push({
        //                        'name':name
        //                    });
        //                //                    console.log(data[r].user_id);
        //                    if(results[i].user_id === res[r].id)
        //                                        results[i].push('Name: '+res[r].firstName+' '+res[r].lastName);
        //                }
        //            });
        //            return data;
        //        }
        var data = results || [];
        res.json({
            data : data,
            status:true
        });
    });

});

app.listen(8080);