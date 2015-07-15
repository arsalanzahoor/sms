console.log("server demands testing");
var follow = require('follow');
var async = require('async'); 
var mysql = require('mysql');
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var login = 'demands';
var folder = 'v2_gulberg';
//**********Begin Establishing a connecttion**********
var excep_seq=0;
var connection;
connection = mysql.createConnection(
{
    host: '192.168.1.40',
    user: 'root',
    password:'051D5101bin85db',
    database: 'v2_gulberg'
});


//**********End Establishing a connecttion**********
var request = require('request');
feed.since = 'now';
// **********You can also set values directly.**********
feed.db = "http://"+login+":"+login+"@192.168.1.40:4984/db";
feed.include_docs = true;

var initialize = function(api, options, next){

    //////////
    // INIT //
    //////////

    var type = "serverdemands";
    var attributes = {
        canChat: true,
        logConnections: true,
        logExits: true,
        sendWelcomeMessage: true,
        verbs: [
        "quit", 
        "exit",
        "paramAdd",
        "paramDelete",
        "paramView",
        "paramsView",
        "paramsDelete",
        "roomChange",
        "roomView",
        "listenToRoom",
        "silenceRoom",
        "detailsView",
        "say"
        ]
    };

    var server = new api.genericServer(type, options, attributes);

    //////////////////////
    // REQUIRED METHODS //
    //////////////////////

    server.start = function(next){
        feed.follow();
        
        //**********Throwing Error/Exceptions in Case of Follow Data Changes**********
        feed.on('error', function(er) {
            console.error('Since Follow always retries on errors, this must be serious');
            //    throw er;
            setTimeout(function() {
                feed.follow()
            }, 5*60*1000);
        });
        
        //**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
        process.on('uncaughtException', function(err) {
            console.log('Caught exception: ' , err.toString());
            var data = {
                to : 'notify@esajeesolutions.com', 
                subject : 'Exception At-'+login,
                body : err.toString()+__filename+excep_seq.toString()
            };
            request({
                method: 'POST',
                url:'http://192.168.1.40/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
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

        //**********Monitoring Every Change In Database**********
        feed.on('change', function(change) {

            excep_seq = change.seq;
            console.log(change.seq,change.id,excep_seq);
            var doc =change.doc;
            //    console.log(change)
            if(doc.data) {
                q.push(doc, function (err) {
                    });
            }
        });
        
        //**********Queue For Pushing Tasks to Queue 2********** 
        var q = async.queue(function (task, callbackq) {
            //    console.log(task);
            var data,smslogid;
            async.waterfall([
                function(callback) {
                    console.log("Starting Transaction");
                    //            connection.connect(function (err)
                    //            {
                    //                if(err)
                    //                {
                    //                    console.log("Error In Connection!!!",err);
                    //                    return;
                    //                }
                    //                console.log('Connected as id:'+connection.threadId);
                    //            });
                    var sqlqry1 = 'start transaction';
                    connection.query(sqlqry1, function(err1, res1) {
                        console.log('err1 and res1:',err1,res1);
                        callback(null,res1);
                    })
                },
                function(res1, callback_t) {
                    console.log("select query");
                    var sqlqry = 'select a.customer,a.mobile,a.itemdemandsid as demandid from itemdemands as a join itemdemanddetails b on a.itemdemandsid = b.fkdemandid where a.status=1 and a.sms_status=0 and b.fkbarcodeid='+task.data.itemid+' group by a.mobile,b.fkbarcodeid';

                    connection.query(sqlqry, function(error, result){
                
                        if(error)
                        {
                            console.log("Select Query Error:",error);
                            callback_t(error);
                        }
                        else {
                            console.log("Select Query Results:",result);
                    
                            if(result.length === 0){
                                callbackq('no result');
                            }

                            callback_t(null,result);
                        }
                    });
                },
                function(result, callback_u) {
                    //            smslogid=smslogid+1;
                    console.log(result, typeof result, result.length)
                    if(result.length===0){
                        callback_u(null, {}, result);    
                    } else {

                        var demandsbycomma = [];
                        for(var i =0; i < result.length;i++){
                            demandsbycomma[i] = "'"+result[i]['demandid']+"'";
                        }
                        var demandsbycommas = demandsbycomma.join(',');
                        var sqlquery = 'update itemdemands set status=2 where  itemdemandsid in ('+demandsbycommas+')';
                        //            var sqlquery = 'update itemdemands as a join itemdemanddetails b on a.itemdemandsid = b.fkdemandid set a.status=2,smslog_id='+smslogid+' where a.status=1 and a.sms_status=0 and b.fkbarcodeid='+task.data.itemid;
                        console.log("update query", sqlquery);
                        connection.query(sqlquery, function(err, res){
                            if(err)
                            {
                                console.log("Update Query Error:",err);
                                callback_u(err);
                            }
                            else {
                                console.log("Update Query Results:",res)
                                callback_u(null,res,result);
                            }
                        });
                    }
                },
                function(res, result, callback_c) {
                    if(result.length===0){
                        callback_c(null, {}, result);    
                    } else {
                        console.log("committing Transaction", res, result);
                        var sqlqry2 = 'commit;';


                        connection.query(sqlqry2, function(err2, res2) {
                            callback_c(err2,res2, result);
                        });
                    //                connection.end();
                    }

                }
                ],
                function(err2, res2, result) {
                    if(!err2) {

                
                 
                        if(result.length!==0){
                            console.log("ending", res2, result);
                            // data.smslog_id=smslogid;
                            //                data.sms = 'Hello';
                            console.log(data);
                            q2.push(result, function(e,r) {
                                console.log("pushed"); 
                            });

                   
                        }
                    } else {

                    }
                    console.log('In Case of Error or Stuck:',err2,result);
                    callbackq('with result');
                });
        }, 1); 

        //**********Queue For Pushing/Performing Tasks********** 

        var q2 = async.queue(function(task, callback) {

            var data = task;
            data.usetemplate  = 1;
            request({
                method: 'POST',
                url:'http://192.168.1.40/'+folder+'/admin/api.php?method=smsLog&type=post&user_id=1888', 
                form:data
            }, function (error, response, body) {
                console.log("error",error,response.statusCode,body);
                callback();
                if (!error && response.statusCode == 200) {
                    console.log('Getting Post body response:',body, '*******Post Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
                }
            });
        });

    };

    server.stop = function(next){
        next();
    };

    server.goodbye = function(connection, reason){
    
    };

    ////////////
    // EVENTS //
    ////////////

    server.on("connection", function(connection){
        
        });

    /////////////
    // HELPERS //
    /////////////

    next(server);
};

/////////////////////////////////////////////////////////////////////
// exports
exports.initialize = initialize;