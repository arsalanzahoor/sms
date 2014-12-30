var express = require('express'),
bodyParser = require('body-parser'),
oauthserver = require('node-oauth2-server'); // Would be: 'oauth2-server'

var app = express();
app.use(logErrors);
app.use(express.static(__dirname + '/public'));
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
app.use(bodyParser());

app.oauth = oauthserver({
    model: require('./model'),
    grants: ['auth_code', 'password'],
    debug: true
});

// Handle token grant requests
app.all('/oauth/token', app.oauth.grant());

// Show them the "do you authorise xyz app to access your content?" page
app.get('/oauth/authorise', function (req, res, next) {
    if (!req.session.user) {
        // If they aren't logged in, send them to your own login implementation
        return res.redirect('/login?redirect=' + req.path + '&client_id=' +
            req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
    }

    res.render('authorise', {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
    });
});

// Handle authorise
app.post('/oauth/authorise', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login?client_id=' + req.query.client_id +
            '&redirect_uri=' + req.query.redirect_uri);
    }

    next();
}, app.oauth.authCodeGrant(function (req, next) {
    // The first param should to indicate an error
    // The second param should a bool to indicate if the user did authorise the app
    // The third param should for the user/uid (only used for passing to saveAuthCode)
    next(null, req.body.allow === 'yes', req.session.user.id, req.session.user);
}));

// Show login
app.get('/signin', function (req, res, next) {
    res.render('signin', {
        redirect: req.query.redirect,
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
    });
});

// Handle login
app.post('/signin', function(req, res){
    console.log(req.body);
    var username=req.body.username;
    var password=req.body.password;
//    res.send({
//        status:true
//    });
//    return;
    if(username != null && password != null)
    {
        var sql= 'select * from users where username= ? and password=?';
    
        var connection = require('./mysqlconnection.js');
    
        //if(username.length>1 || password.length>1)
        //{
        //    console.log( req.body);//display user input values on server side
        connection.query(sql, [username,password],function(err, result)
        {
            console.log(result);
            if(result=='')
            {
                console.log("Unauthorise User Values");
                res.send({
                    status:false
                });
                return;
            // res.redirect('/signin');
            }
            else
            {
                console.log("Authorised");
                res.send({
                    status:true
                });
                return;
            //res.redirect('/home'); 
            //res.sendFile(_dirname+'/SignIn.html')
            }
        }
        );
    }
    else
    {
        console.log("Username or Password Field Is Empty");
        res.send({
            status:false
        });
        return;
    }
//connection.end();
});


app.get('/home', function (req, res, next) {
    if (!req.session.user) {
        // If they aren't logged in, send them to your own login implementation
        return res.redirect('/login?redirect=' + req.path + '&client_id=' +
            req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
    }

    res.render('home', {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
    });
});


       
app.post('/home', function (req, res){
    console.log(req.body);
    var connection=require('./mysqlconnection.js')
    var sqlquery;
    var newusername=req.body.newusername;
    var newpassword=req.body.newpassword;
    var status;
    //    res.send({status:true});
    //        return;
        
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
        
        connection.query(sqlquery,function(err,result)
        {
            console.log(result);
            if(result==' ')
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
    }
    else 
    {
        console.log("Username or Password field is empty");
        res.send({
            status:false
        });
        return;
    }
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
    res.sendFile(__dirname + '/public/pages/admin-page.html');
});

app.get('/public', function (req, res) {
    // Does not require an access_token
    res.send('Public area');
});

// Error handling
app.use(app.oauth.errorHandler());

app.listen(3000);
