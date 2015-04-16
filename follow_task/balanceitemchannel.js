var follow = require('follow');
var async = require('async'); 
var mysql = require('mysql');
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var login = 'demands';
var folder = 'v2_gulberg';
//**********Begin Establishing a connecttion**********

var connection;
connection = mysql.createConnection(
{
    host: '192.168.1.40',
    user: 'root',
    password:'051D5101bin85db',
    database: 'v2_gulberg'
});
connection.connect(function (err)
{
    if(err)
    {
        console.log("Error In Connection!!!");
        return;
    }
    console.log('Connected as id:'+connection.threadId);
});

//**********End Establishing a connecttion**********
var request = require('request');
feed.since = 'now';
// **********You can also set values directly.**********
feed.db = "http://"+login+":"+login+"@192.168.1.40:4984/db";
feed.include_docs = true;

//**********Queue For Pushing Tasks to Queue 2********** 
var q = async.queue(function (task, callback) {
    console.log(task);
    var data,smslogid;
    var sqlqry1 = 'select MAX(smslog_id) as id from itemdemands';
    connection.query(sqlqry1, function(e, r) {
        smslogid=r[0].id;
        console.log("sms id",smslogid);
    });
    async.waterfall([
        function(callback) {
            console.log("Starting Transaction");
            var sqlqry1 = 'start transaction';
            connection.query(sqlqry1, function(err1, res1) {
                console.log(err1,res1);
                callback(null,res1);
            })
        },
        function(res1, callback) {
            console.log("select query");
            var sqlqry = 'select a.customer,a.mobile,a.itemdemandsid as demandid from itemdemands as a join itemdemanddetails b on a.itemdemandsid = b.fkdemandid where a.status=1 and a.sms_status=0 and b.fkbarcodeid='+task.data.itemid+' group by a.customer,b.fkbarcodeid';
            connection.query(sqlqry, function(error, result){
                if(error)
                {
                    console.log("Select Query Error:",error);
                }
                else {
                    console.log("Select Query Results:",result);
                    for(var i=0;i<result.length;i++) {
                        data = result[0];
                        data.usetemplate = 1;
                        console.log(data);
                        callback(null,result);
                    }
                }
            });
        },
        function(result, callback) {
            smslogid=smslogid+1;
            console.log("update query for smslog",smslogid);
            var sqlquery = 'update itemdemands as a join itemdemanddetails b on a.itemdemandsid = b.fkdemandid set a.status=2,smslog_id='+smslogid+' where a.status=1 and a.sms_status=0 and b.fkbarcodeid='+task.data.itemid;
            connection.query(sqlquery, function(err, res){
                if(err)
                {
                    console.log("Update Query Error:",err);
                }
                else {
                    console.log("Update Query Results:",res)
                    callback(null,res);
                }
            });
        },
        function(res, callback) {
            console.log("committing Transaction");
            var sqlqry2 = 'commit;';
            connection.query(sqlqry2, function(err2, res2) {
                callback(null,res2);
            });
        }
        ],
        function(err2, res2) {
            if(!err2) {
                console.log("ending",smslogid);
                data.smslog_id=smslogid;
//                data.sms = 'Hello';
                console.log(data);
                q2.push(data, function(e,r) {
                    console.log("pushed"); 
                });
            }
        });
}, 1); 

//**********Queue For Pushing/Performing Tasks********** 

var q2 = async.queue(function(task, callback) {
    request({
        method: 'POST',
        url:'http://192.168.1.40/'+folder+'/admin/api.php?method=smsLog&type=post&user_id=1888', 
        form:(task)
    }, function (error, response, body) {
        console.log("error",error,response.statusCode,body);
        callback();
        if (!error && response.statusCode == 200) {
            console.log('Getting Post body response:'+ body+ '*******Post Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
        }
    });
});
//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {

    console.log(change.seq,change.id);
    var doc =change.doc;
    q.push(doc, function (err) {
        });
})
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    //    throw er;
    setTimeout(function() {
        feed.follow()
    }, 5*60*1000);
})

//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Exception At-'+login, 
        body : JSON.stringify(err)
    };
    request({
        method: 'POST',
        url:'http://192.168.1.41/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
    //        json:true
        
    }, function (error, response, body) {
        //        callback(error, response);
        if (!error && response.statusCode == 200) {
            //        var obj = JSON.parse(body);
            console.log("Email has been Send")
        }
    });
});

feed.follow();