
var express = require('express'),
bodyParser = require('body-parser'),
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
console.log('Express server started on port 3000');
var token;

// Show login
app.get('/signin',function (req, res, next){
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
    //                console.log(token);
    // Save the access token
    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error.message);
        }
        token = oauth2.accessToken.create(result);
        console.log(token);
        res.send(token.token);
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



app.get('/admin', function (req, res) {
    // Will require a valid access_token
    //console.log("hello!");
    res.sendFile(__dirname + '/public/pages/admin-page.html')
});
    
    app.get('/employee', function (req, res) {
    // Will require a valid access_token
    //console.log("hello!");
    res.sendFile(__dirname + '/public/pages/employees-page.html');
    });  
    app.get('/attendance', function (req, res) {
    // Will require a valid access_token
    //console.log("hello!");
    res.sendFile(__dirname + '/public/pages/attendance-page.html');
});

app.get('/public', function (req, res) {
    // Does not require an access_token
    res.send('Public area');
});

// Error handling
//app.use(app.oauth.errorHandler());

app.listen(3000);
