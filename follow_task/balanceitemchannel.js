var follow = require('follow');
var async = require('async'); 
var mysql = require('mysql');
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

//**********Begin Establishing a connecttion**********

var connection;
connection = mysql.createConnection(
{
    host: '192.168.1.40',
    user: 'root',
    password:'051D5101bin85db',
    database: 'staging_kohsar'
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
 
//var obj;
var request = require('request');
feed.since = 2686;
//        feed.follow();

// **********You can also set values directly.**********
feed.db            = "http://website:website@192.168.1.40:4984/db";
feed.include_docs = true;

var document;
var method1;
var url;
//**********Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    console.log(task.data);
    //    callback();   
    var data;
    var sqlquery = 'select a.mobile from itemdemands as a join itemdemanddetails b on a.itemdemandsid = b.fkdemandid where a.status=0 and a.sms_status=0 and b.fkbarcodeid='+task.data.itemid;
    connection.query(sqlquery, function(err, res){
        if(err)
        {
            console.log("Error:",err);
        }
        else {
//            console.log("Results:",res);
            data = res[0];
            data.usetemplate = 1;
            //        console.log("Results:",res);

            console.log(data);
            request({
                method: 'POST',
                url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=smsLog&type=post&user_id=1888', 
                form:(data)
            //        json:true
                
            }, function (error, response, body) {
                callback();
                if (!error && response.statusCode == 200) {
                    console.log('Getting body response:'+ body+ '*******Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
                //        var obj = JSON.parse(body);
                }
            });
        }
    })
       
}, 1); 
//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {

    //    console.log(change.seq,change.id);
    var doc =change.doc;
    q.push(doc, function (err) {
        //            console.log('finished processing task');
        });
})
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
feed.follow();