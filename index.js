
var express = require('express'),
bodyParser = require('body-parser'),
mysql = require('mysql'),
app = express();

var oauth2 = require('simple-oauth2')({
    clientID: 'abc1',
    clientSecret: '12345',
    site: 'http://localhost:9000',
    tokenPath: '/oauth/access_token'
});
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
    redirect_uri: 'http://localhost:3000',
    scope: 'notifications',
    state: '3(#0/!~'
});


// Initial page redirecting to Github
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});
var token = {
    'access_token': '<access-token>',
    'refresh_token': '<refresh-token>',
    'expires_in': '3600'
};
// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
    var code = req.query.code;
    console.log('/callback');
    oauth2.authCode.getToken({
        code: code,
        redirect_uri: 'http://localhost:3000'
    }, saveToken);

    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error.message);
        }
        token = oauth2.accessToken.create(result);
    }
});

//app.get('/', function (req, res) {
//  res.send('Hello<br><a href="/auth">Log in with Github</a>');
//});
console.log('Express server started on port 3001');


// Show login
app.get('/roles',function (req, res, next){
    oauth2.api('GET','/oauth/authorise',{
        access_token: token.token.access_token
    },function (err, data) {
        console.log("Error on your next call",err, data);
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

// Handle login
app.post('/signin',  function(req, res){
    //    console.log("Test");
    //    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    //                console.log("Authorised");
    oauth2.password.getToken({
        username: username,
        password: password 
    }, saveToken);
    console.log(token);
    // Save the access token
    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error);
            token = oauth2.accessToken.create(error);
            res.send(token.token);
        }
        else {
        
            token = oauth2.accessToken.create(result);
            //    console.log(token);
            if (token.expired()) {
                token.refresh(function(error, result) {
                    token = result;
                })
            }
            res.send(token.token);
        }
    //                    oauth2.api('GET', '/users', {
    //                        access_token: token.token.access_token
    //                    }, function (err, data) {
    //                        console.log(err, data);
    //                    });
    }
//                console.log("Authorised");
//                res.send({
//                    status:true
//                });
//                return;
//res.redirect('/home'); 
//res.sendFile(_dirname+'/SignIn.html')
//connection.end();
});


app.get('/signout',function (req, res){
    token.revoke('access_token', function(error) {
        // Session ended. But the refresh_token is still valid.

        // Revoke the refresh_token
        token.revoke('refresh_token', function(error) {
            console.log('token revoked.');
            res.send({status:true});

        });
    });
});



app.get('/home', function (req, res, next) {
    if (!req.session.user) {
        // If they aren't logged in, send them to your own login implementation
        //        console.log("test");
        return res.redirect('/login?redirect=' + req.path + '&client_id=' +
            req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
    }

    res.render('home', {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
    });
});


       
app.post('/home', function (req, res){
    //console.log(req.query)
    //    console.log(req.body.newusername);
    var connection=require('./mysqlconnection.js')
    //    res.send({
    //        status:true
    //    });
    //    return;
    var sqlquery;
    var newusername=req.body.newusername;
    var newpassword=req.body.newpassword;
    var status;
        
       
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
        
    connection.query(sqlquery,function(err,result)
    {
        console.log("Your Error:",result,err);
        if(result=='')
        {
            res.send({
                status:false
            });
            return;
        }
        else
        {
            //console.log(result);
            res.send({
                status:true
            });
            return;
        }
    
    })
//res.send("Congratulatios!!! You Have Successfully Login!"); 
//res.redirect('/Home');
// connection.end();
});
      

/* Old Login Post
app.post('/login', function (req, res, next) {
    
  // Insert your own login mechanism
  if (req.body.email !== 'thom@nightworld.com') {
    res.render('login', {
      redirect: req.body.redirect,
      client_id: req.body.client_id,
      redirect_uri: req.body.redirect_uri
    });
  } else {
    // Successful logins should send the user back to the /oauth/authorise
    // with the client_id and redirect_uri (you could store these in the session)
    return res.redirect((req.body.redirect || '/home') + '?client_id=' +
        req.body.client_id + '&redirect_uri=' + req.body.redirect_uri);
  }
});
*/
app.get('/', function (req, res) {
    // Will require a valid access_token
    //console.log("hello!");
    res.sendFile(__dirname + '/public/pages/index.html');
});

//app.get('/list', function (req, res) {
//// Will require a valid access_token
////console.log("hello!");
//res.sendFile(__dirname + '/public/pages/list-test.html');
//});

var total_records=null;
var total_attenedence=null;

app.get('/employees',function(req, res) {
    connection.query('SELECT COUNT(*) AS total FROM employee',function(err,row){
        total_records=row[0].total;
    });

    var record_start=req.query.page_start;
    var record_limit=req.query.page_limit;

    if(record_start==='' && record_limit===''){
        connection.query('SELECT * FROM employee LIMIT 10', function(err, rows){
            res.json({
                message : rows,
                total_records:total_records,
                status:'true'
            });
        });
    }
    else{

        connection.query("SELECT * FROM employee LIMIT ? OFFSET ?",[parseInt(req.query.page_limit),parseInt(req.query.page_start)], function(err, rows){
            res.json({
                message : rows,
                total_records:total_records,
                status:'true'
            });
        });


    }
});

app.get('/public', function (req, res) {
    // Does not require an access_token
    res.send('Public area');
});

// Error handling
//app.use(app.oauth.errorHandler());
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '786ab786'
});
connection.query('USE dpemployeedb');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.use(function(req, res, next) {
    // do logging
    console.log('processing request.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    //    res.json({ message: 'hooray! welcome to our api!' });
    res.sendFile(__dirname + '/public/pages/index.html');

});



//router.post('/signin',  function(req, res){
//    //    console.log("Test");
//    //    console.log(req.body);
//    var username = req.body.username;
//    var password = req.body.password;
//    //                console.log("Authorised");
//    if(username==='admin' && password==='admin')
//        {
//            res.send(true);
//        }
//        res.send(false);
//});

// more routes for our API will happen here



// on routes that end in /employee
// =============================================================================
// =============================================================================
router.route('/employee')

    // create a sms (accessed at POST http://localhost:8080/api/employee)
    .post(function(req, res) {
        var post1={
            FirstName:req.body.firstname,
            LastName:req.body.lastname,
            CompanyName:req.body.companyname, 
            RegistrationDate:new Date(),
            MainID:req.body.mainid
        };
        //-----------------------
        console.log(post1.MainID);
        if(post1.FirstName!='' && post1.LastName!='' && post1.CompanyName!='' && post1.MainID!==''){
            connection.query('INSERT INTO employee set ?', post1, function(err, result) {
                if(err){
                    res.json({
                        data: err
                    });
                }
                else{

                    res.json({
                        data: 'New employee saved !',
                        status:true
                    });
                }
            })
        }
        else{
            res.json({
                data:'Please Enter Missing Field First',
                status:false
            });
        }


    //-----------------------
    })
    // get all the employee from record table (accessed at GET http://localhost:8080/api/employee)
    .get(function(req, res) {

        connection.query('SELECT COUNT(*) AS total FROM employee',function(err,row){
            total_records=row[0].total;
        });

        var record_start=req.query.page_start;
        var record_limit=req.query.page_limit;

        //       if(record_start==='' && record_limit===''){
        connection.query('SELECT * FROM employee', function(err, rows){
            var data = rows || [];
            res.json({
                data : data,
                total_records:total_records,
                status:true
            });
        });
    //    }
    //        else{
    //
    //connection.query("SELECT * FROM employee LIMIT ? OFFSET ?",[parseInt(req.query.page_limit),parseInt(req.query.page_start)], function(err, rows){
    //      res.json({message : rows,total_records:total_records,status:'true'});
    //  		});
    //
    //
    //        }
    });

// =============================================================================
// =============================================================================
// on routes that end in /employee/search
// ----------------------------------------------------

router.route('/employee/:EmployeeID')
    // get the person record  (accessed at GET http://localhost:8080/api/employee/)
    .get(function(req, res) {
        //search on the base of FirstName
        //console.log(req.query);
        connection.query("SELECT * FROM employee where EmployeeID =?",[req.query.employeeid], function(err, rows){
            if(err){
  
                res.json({
                    message: err
                });
      
            }

            else if(rows.length>0){
                res.json({
                    data : rows,
                    status:true
                });
            }
            else{
                res.json({
                    data : 'Person Does not exsist ! ',
                    status:false
                });
            }
        });


    })
    //-----------------------------------


    // update  the Person recorrd (accessed at GET http://localhost:8080/api/employee)
    .put(function(req, res) {
        //  console.log(req.body);   
        connection.query("SELECT * FROM employee where EmployeeID =?",[req.body.employeeid], function(err, rows){
            if(err){
  
                res.json({
                    data: err
                });
      
            }

            else if(rows.length>0){
      
                //  console.log(req.body.firstname);
                var post1={
                    FirstName:req.body.firstname,
                    LastName:req.body.lastname,
                    CompanyName:req.body.companyname
                };
                if(post1.FirstName!='' && post1.LastName!='' && post1.CompanyName!=''){
                    connection.query("update employee set FirstName=?, LastName=?, CompanyName=? where EmployeeID=?",[post1.FirstName,post1.LastName,post1.CompanyName,req.body.employeeid], function(err) {
                        if(err){
                            res.json({
                                data: err
                            });
                        }
                        else{
                            res.json({
                                data: 'Person  data updated!',
                                status:true
                            });
                        }
                    });
                }
                else{
                    res.json({
                        data:'Please Enter Missing Field First',
                        status:false
                    });
                }

  

            }
            else{
                res.json({
                    data : 'Person Not Found',
                    status:false
                });
            }
        });


    });




// on routes that end in /employeeattendence
// =============================================================================
// =============================================================================
router.route('/employeeattendence')

    // create a sms (accessed at POST http://localhost:8080/api/employeeattendence)
    .post(function(req, res) {
        var post1={
            EmployeeID:req.body.EmployeeID, 
            attendence:new Date()
        };
        //-----------------------
        if(post1.EmployeeID!=''){
            connection.query('INSERT INTO employeeattendence set ?', post1, function(err, result) {
                if(err){
                    res.json({
                        message: err
                    });
                }
                else{

                    res.json({
                        message: 'attendence saved !',
                        status:'true'
                    });
                }
            })
        }
        else{
            res.json({
                message:'Please Enter EmployeeID First',
                status:'false'
            });
        }



    //-----------------------
    })
    // get all the employeeattendence from record table (accessed at GET http://localhost:8080/api/eemployeeattendence)
    .get(function(req, res) {
    
        connection.query('select Year(Attendence) as Year,MonthName(Attendence) as Month,Count(*) as totalattendance from employeeattendence group by Year(Attendence),Month(attendence)',function(err,rows){
            console.log(rows);   
            if(rows) {
                res.json({
                    data : rows,
                    status : true
                });
            }
            else
            {
                res.json({
                    data : null,
                    status : false
                })
            }
        });

    });



//var record_start=req.query.page_start;
//var record_limit=req.query.page_limit;
//
//if(record_start===''&&record_limit===''){
//    connection.query('SELECT * FROM employeeattendence LIMIT 10', function(err, rows){
//        res.json({data : rows,total_records:total_attenedence,status:true});
//    });}
//else{
//console.log("else");
//    connection.query("SELECT * FROM employeeattendence LIMIT ? OFFSET ?",[parseInt(req.query.page_limit),parseInt(req.query.page_start)], function(err, rows){
//        res.json({data : rows,total_records:total_attenedence,status:true});
//    });
//
//
//}


// =============================================================================
// =============================================================================




// on routes that end in /employeeattendence/search
// ----------------------------------------------------

router.route('/employeeattendence/report')
    // get the person record  (accessed at GET http://localhost:8080/api/employeeattendence/search)
    .get(function(req, res) {
        //search on the base of FirstName
        //console.log(req.query);
        var employeeid = req.query.EmployeeID;
        var fromdate = req.query.fromdate;
        var todate = req.query.todate;
        if(employeeid != '' && fromdate != '' && todate != '')
        {
            connection.query("SELECT e.FirstName,e.LastName,a.Attendence,min(a.Attendence) as timein,max(a.Attendence) as timeout from employee e,(SELECT * FROM employeeattendence where EmployeeID=? and Attendence between ? and ?) a where e.EmployeeID=a.EmployeeID group by Date(Attendence),FirstName,LastName",[employeeid,fromdate,todate], function(err, rows){
                //        connection.query("SELECT Attendence,min(Attendence) as timein,max(Attendence) as timeout from (SELECT * FROM employeeattendence where EmployeeID=? and Attendence between ? and ?) as records group by Date(Attendence)",[employeeid,fromdate,todate], function(err, rows){
        
                if(err){
  
                    res.json({
                        message: err
                    });
            
                }

        
                else if(rows.length>0){
                    res.json( {
                        data : rows,
                        status:true
                    });
                }
                else{
                    res.json({
                        data : 'Person Does not exsist ! ',
                        status:false
                    });
                }
            });

        //console.log(a.sql);
        }
        else if(employeeid == '' && fromdate != '' && todate != '')
        {
            connection.query("SELECT e.FirstName,e.LastName,a.Attendence,min(a.Attendence) as timein,max(a.Attendence) as timeout from employee e,(SELECT * FROM employeeattendence where Attendence between ? and ?) a where e.EmployeeID=a.EmployeeID group by Date(Attendence),FirstName,LastName",[fromdate,todate], function(err, rows){
                //        connection.query("SELECT Attendence,min(Attendence) as timein,max(Attendence) as timeout from (SELECT * FROM employeeattendence where Attendence between ? and ?) as records group by Date(Attendence)",[fromdate,todate], function(err, rows){
                //        console.log(err,rows);
                if(err){
  
                    res.json({
                        message: err
                    });
      
                }
        
                else if(rows.length>0){
                    res.json( {
                        data : rows,
                        status:true
                    });
                }
                else{
                    res.json({
                        data : 'Person Does not exsist ! ',
                        status:false
                    });
                }
            });
        }
        else if(fromdate == '' && todate == '' && employeeid !='')
        {
            connection.query("SELECT e.FirstName,e.LastName,a.Attendence,min(a.Attendence) as timein,max(a.Attendence) as timeout from employee e,(SELECT * FROM employeeattendence where EmployeeID=?) a where e.EmployeeID=a.EmployeeID group by Date(Attendence),FirstName,LastName",[employeeid], function(err, rows){
                if(err){
  
                    res.json({
                        message: err
                    });
      
                }

                else if(rows.length>0){
                    res.json( {
                        data : rows,
                        status:true
                    });
                }
                else{
                    res.json({
                        data : 'Person Does not exsist ! ',
                        status:false
                    });
                }
            });
        }
        else
        {
            connection.query("SELECT e.FirstName,e.LastName,a.Attendence,min(a.Attendence) as timein,max(a.Attendence) as timeout from employee e,(SELECT * FROM employeeattendence) a where e.EmployeeID=a.EmployeeID group by Date(Attendence),FirstName,LastName", function(err, rows){
                if(err){
  
                    res.json({
                        message: err
                    });
      
                }

                else if(rows.length>0){
                    res.json( {
                        data : rows,
                        status:true
                    });
                }
                else{
                    res.json({
                        data : 'Person Does not exsist ! ',
                        status:false
                    });
                }
            });
        }

    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(3001);
