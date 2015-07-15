console.log('process counter action started');
exports.processCounter = {
    name: 'processCounter',
    description: 'Process Counters',
    inputs : {
        post:{
            required:true
        }
    },   
    run: function(api, connection, next){
        if(connection.params.post.room){
            console.log('room test',connection.params.post.room);
            
            var moment = require('moment');
            console.log('test actionmessage');
            console.log('room and message:',typeof connection.params.post.message);
            var msg = JSON.parse(connection.params.post.message);
            var loc;
            switch(msg.location){
                case 1:
                    loc = 'DHA';
                    break;
                case 2:
                    loc = 'GULBERG';
                    break;
                case 3:
                    loc = 'KOHSAR';
                    break;
            }
            var date = moment.unix(msg.closingdate).format("MM/DD/YYYY");
            var newdate = moment();
            //            var comp = 1000*60*60*24*1;
            var comp = 1000*60*2;
            api.log('info', 1, 'test',msg,date,loc);
            api.redis.client.HSET("CLOSING",loc+'_'+msg.counter+'_'+msg.closingid,connection.params.post.message, function(e, b){
                api.log('e,b:',e,b);
            });
            api.redis.client.HGETALL('CLOSING', function(e,b){
                api.log('e and b of HGETALL e:',e,'b:',typeof b,b);
                for(var i in b){
                    api.log('info',1,b[i]);
                    var da = JSON.parse(b[i]);
                    console.log('data:',da,typeof da,da.closingdate,da);
                    var dif = newdate.diff(moment.unix(da.closingdate).format("MMM/DD/YYYY HH:mm:ss"));
                    console.log('dif and comp', typeof dif,typeof comp,dif,comp,'date,loc,counter:',date,loc,msg.counter);
                    if(dif >= comp){
                        var location;
                        switch(da.location){
                            case 1:
                                location = 'DHA';
                                break;
                            case 2:
                                location = 'GULBERG';
                                break;
                            case 3:
                                location = 'KOHSAR';
                                break;
                        }
                        var date1 = moment.unix(da.closingdate).format("MM/DD/YYYY");
                        console.log('key:',date1+'_'+location+'_'+da.counter);
                        if(da.closing == 'Close'){
                            api.redis.client.HDEL('CLOSING',location+'_'+da.counter+'_'+da.closingid, function(e,b){
                                console.log('info', 1,'Delete', e,b);
                            });
                        }
                    }
                }
            });
        }else {
            connection.response.id = api.id;
            //        console.log('testing params:',connection.params.post);
            var url2,callbackurl,updatesaleurl;
            var method = connection.params.post.method;
            //        var data = JSON.parse(connection.params.post);
            var data = connection.params.post.data;
            //        console.log('data:',typeof data,data.saleid);
            /* switch(method) {
            case 'getSaleData':
                url2 = connection.params.post.link+'api.php?method=processSaleNewData&type=post&user_id='+connection.params.post.user_id+'&currentid='+data.fksaleid;
                callbackurl = connection.params.post.link+'api.php?method=processSaleNewData&type=post&user_id='+connection.params.post.user_id+'&currentid='+data.fksaleid;
                updatesaleurl = connection.params.post.link+'api.php?method=updateSaleServerId&type=post&user_id='+connection.params.post.user_id;
                break;
            case 'stopPosClosing':
                url2 = data.url;
                callbackurl = data.callbackurl;
                break;
            case 'startPosClosing':
                url2 = data.url;
                callbackurl = data.callbackurl;
                break;
            case 'processPayOutData':
                url2 = data.url;
                callbackurl = data.callbackurl;
                break;
            case 'processcDemandData':
                url2 = data.url;
                callbackurl = data.callbackurl;
                break;
            case 'uploadClosingData':
                url2 = data.url;
                callbackurl = data.callbackurl;
                break;
        }*/
            if(method == 'getSaleData'){
                url2 = connection.params.post.link+'api.php?method=processSaleNewData&type=post&user_id='+connection.params.post.user_id+'&currentid='+data.fksaleid;
                callbackurl = connection.params.post.link+'api.php?method=processSaleNewData&type=post&user_id='+connection.params.post.user_id+'&currentid='+data.fksaleid;
                updatesaleurl = connection.params.post.link+'api.php?method=updateSaleServerId&type=post&user_id='+connection.params.post.user_id;
            }else {
                url2 = data.serverurl;
                callbackurl = data.callbackurl;
            }
            if(url2){
                //            var url2=connection.params.post.url;
                console.log('url2',url2);
                var reqs=require('request');
                var trim=require('trim');
                var options = {
                    url: url2,
                    method: 'POST'
                };
                if(data){
                    if(method == 'getSaleData'){
                        options.form = data;
                    }else {
                        options.form = data.data;
                    }
                }
                reqs(options, function(error, response, body) {
                    console.log('REQUEST:',error, response.statusCode,body) ;
                    connection.response.event = connection.params.post.method;
                    connection.response.data = trim(body);
                    //                console.log('REQUEST CONNECTION PARAMS POST METHOD:',connection.params.post.method);
                    if(connection.params.post.method == 'getSaleData') {
                        var data1 = JSON.parse(body);
                        var options = {
                            id:data1.serverid
                        };
                    //                    api.elasticSearch(data.serverid, function(error, done){
                    //                        if(error)
                    //                            console.log('ERROR ELASTICSEARCH:',error);
                    //                        console.log('DONE ELASTICSEARCH:',done);
                    //                    });
                    //                    //========================================
                    //                    api.googletrans(data.serverid, function(error, done){
                    //                        if(error)
                    //                            console.log('ERROR GOOGLETRANSFER:',error);
                    //                        console.log('DONE GOOGLETRANSFER:',done);
                    //                    });
                    } 
                    //========================================
                    //                if (connection.params.post.callbackurl){
                    if (callbackurl){
                        connection.response.callbackurl = callbackurl;
                    //                    connection.response.callbackurl = connection.params.post.callbackurl;
                    }
                    //                if (connection.params.post.updatesaleurl){
                    if (updatesaleurl){
                        //                    connection.response.callbackurl = connection.params.post.updatesaleurl;
                        connection.response.callbackurl = updatesaleurl;
                    }
                    connection.response.actionheroVersion = api.actionheroVersion;
                    var now = new Date().getTime();
                    connection.response.uptime = now - api.bootTime;
                    next(connection, true);
                });
            }
        }
    }
};