exports.task = {
    name:          'seqCounter',
    description:   'seqCounter',
    frequency:     1000*1*60*10,
    queue:         'default',
    plugins:       [],
    pluginOptions: {},
  
    run: function(api, params, next){
        // your logic here');
        console.log('seqCounter started');
        var async = require('async')
        var request = require('request')
        var data=[];
        data[0]={
            last_seq:"0",
            counter1:"0"
        };
        data[1]={
            last_seq:"0",
            counter1:"0",
            counter2:"0",
            counter3:"0"
        };
        data[2]={
            last_seq:"0",
            counter2:"0",
            counter3:"0"
        };

        async.series([
            function(callback){
                request('http://gulberg_counter:gulberg_counter@esajeesolutions.com:4984/db/_changes', function (error, response, body) {
                    // api.log("1:",'info',error,response.statusCode);
                    if (!error && response.statusCode == 200) {
                        var d= JSON.parse(body);
                        data[0].last_seq=d.last_seq; 
                        api.redis.client.HSET("SERVERS","GULBERG",data[0].last_seq, function(e,b){
                            api.log('redis res', 'info', e, b)
                        });
                    }
                    callback(null);
                });
            },
            function(callback){
                request('http://gulpos.esajee.com:8080/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                    // api.log("2:" , 'info', error,response.statusCode);
                    if (!error && response.statusCode == 200) {
                        var d= JSON.parse(body);
                        data[0].counter1=d.sequence; 
                        api.redis.client.HSET("SERVERS","GULBERG1",data[0].counter1, function(e,b){
                            api.log('redis res', 'info', e, b)
                        }); 
                    }
                    if(data[0].last_seq>data[0].counter1){
                        var da = {
                            to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                            subject : 'GULBERG COUNTER 1 IS BEHIND ITS SERVER', 
                            body : 'COUNTER 1 SEQUENCE : '+data[0].counter1+' IS BEHIND ITS SERVER SEQUENCE: '+data[0].last_seq
                        };
                        sendEmail(da);
                    }
                    callback(null);
                });
            },
            function(callback){
                request('http://kohsar_counter:kohsar_counter@esajeesolutions.com:4984/db/_changes', function (error, response, body) {
                    // api.log("3:",'info', error,response.statusCode);
                    if (!error && response.statusCode == 200) {
                        var d= JSON.parse(body);
                        data[1].last_seq=d.last_seq; 
                        api.redis.client.HSET("SERVERS","KOHSAR",data[1].last_seq, function(e,b){
                            api.log('\n=================\nREDIS KOHSAR\n=================\n','info',b,e);
                        });
                    }
                    callback(null);
                });
            },
            function(callback){
                request('http://kohpos.esajee.com:8081/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                    // api.log("4:",'info',error,response.statusCode);            
                    if (!error && response.statusCode == 200) {
                        var d= JSON.parse(body);
                        data[1].counter1=d.sequence; 
                        api.redis.client.HSET("SERVERS","KOHSAR1",data[1].counter1, function(e,b){
                            api.log('\n=================\nREDIS KOHSAR\n=================\n','info',b,e);
                        });
                    }
                    if(data[1].last_seq>data[1].counter1){
                        request('http://kohpos.esajee.com:8081/servicerestart.php', function(e, r, b){
                            if(e){
                                var da = {
                                    to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                                    subject : 'KOHSAR COUNTER 1 IS BEHIND ITS SERVER', 
                                    body : 'COUNTER 1 SEQUENCE : '+data[1].counter1+' IS BEHIND ITS SERVER SEQUENCE: '+data[1].last_seq
                                };
                                sendEmail(da);
                            }
                        });
                    }
                    callback(null);
                });
            },
            function(callback){
                request('http://kohpos.esajee.com:8082/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                    // api.log("5:",'info',error,response.statusCode);            
                    if (!error && response.statusCode == 200) {
                        var d= JSON.parse(body);
                        data[1].counter2=d.sequence; 
                        api.redis.client.HSET("SERVERS","KOHSAR2",data[1].counter2, function(e,b){
                            api.log('\n=================\nREDIS KOHSAR\n=================\n','info',b,e);
                        });
                    }
                    if(data[1].last_seq>data[1].counter2){
                        request('http://accounts.esajee.com/servicerestart.php', function(e, r, b){
                            if(e){
                                var da = {
                                    to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                                    subject : 'KOHSAR COUNTER 2 IS BEHIND ITS SERVER', 
                                    body : 'COUNTER 2 SEQUENCE : '+data[1].counter2+' IS BEHIND ITS SERVER SEQUENCE: '+data[1].last_seq
                                };
                                sendEmail(da);
                            }
                        });
                    }
                    callback(null);
                });
            },
            function(callback){
                request('http://kohpos.esajee.com:8083/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                    // api.log("6:",'info',error,response.statusCode);
                    if (!error && response.statusCode == 200) {
                        var d= JSON.parse(body);
                        data[1].counter3=d.sequence; 
                        api.redis.client.HSET("SERVERS","KOHSAR3",data[1].counter3, function(e,b){
                            api.log('\n=================\nREDIS KOHSAR\n=================\n','info',b,e);
                        });
                    }
                    if(data[1].last_seq>data[1].counter3){
                        request('http://kohpos.esajee.com:8083/servicerestart.php', function(e, r, b){
                            if(e){
                                var da = {
                                    to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                                    subject : 'KOHSAR COUNTER 3 IS BEHIND ITS SERVER', 
                                    body : 'COUNTER 3 SEQUENCE : '+data[1].counter3+' IS BEHIND ITS SERVER SEQUENCE: '+data[1].last_seq
                                };
                                sendEmail(da);
                            }
                        });
                    }
                    callback(null);
                });
            },
            function(callback){
                request('http://dha_counter:dha_counter@esajeesolutions.com:4984/db/_changes', function (error, response, body) {
                    // api.log("7:",'info',error,response.statusCode);
                    if (!error && response.statusCode == 200) {

                        var d= JSON.parse(body);
                        data[2].last_seq=d.last_seq; 
                        api.redis.client.HSET("SERVERS","DHA",data[2].last_seq, function(e,b){
                            api.log('\n=================\nREDIS DHA\n=================\n','info',b,e);
                        });
                    }
                    
                    callback(null);
                });
            },
            function(callback){
         
                request('http://dhapos.esajee.com:8082/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                    // api.log("8:",'info',error,response.statusCode);
                    if (!error && response.statusCode == 200) {
   
                        var d= JSON.parse(body);
                        data[2].counter2=d.sequence; 
                        api.redis.client.HSET("SERVERS","DHA2",data[2].counter2, function(e,b){
                            api.log('\n=================\nREDIS DHA\n=================\n','info',b,e);
                        });
                    }
                    
                    if(data[2].last_seq>data[2].counter2){
                        request('http://dhapos.esajee.com:8082/servicerestart.php', function(e, r, b){
                            if(e){
                                var da = {
                                    to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                                    subject : 'DHA COUNTER 2 IS BEHIND ITS SERVER', 
                                    body : 'COUNTER 2 SEQUENCE : '+data[2].counter2+' IS BEHIND ITS SERVER SEQUENCE: '+data[2].last_seq,
                                };
                                sendEmail(da);
                            }
                        });
                    }
                    callback(null);
                });

            },
            function(callback){
                request('http://dhapos.esajee.com:8083/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                    // api.log("9:",'info',error,response.statusCode);
                    if (!error && response.statusCode == 200) {
   
                        var d= JSON.parse(body);
                        data[2].counter3=d.sequence;
                        api.redis.client.HSET("SERVERS","DHA3",data[2].counter3, function(e,b){
                            api.log('\n=================\nREDIS DHA\n=================\n','info',b,e);
                        });
                    }
                    if(data[2].last_seq>data[2].counter3){
                        request('http://dhapos.esajee.com:8083/servicerestart.php', function(e, r, b){
                            if(e){
                                var da = {
                                    to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                                    subject : 'DHA COUNTER 3 IS BEHIND ITS SERVER', 
                                    body : 'COUNTER 3 SEQUENCE : '+data[2].counter3+' IS BEHIND ITS SERVER SEQUENCE: '+data[2].last_seq,
                                };
                                sendEmail(da);
                            }
                        });
                    }
                    // api.log('data','info',typeof data,data);
                    //                request.psot('http://192.168.1.40:8080/api/sequenceCounter?apiVersion=1&post='+JSON.stringify(data), function(err, res, bo){
                    //                    console.log(err,res,bo); 
                    //                });
                    callback(null);
                });
            },
            ]);  

        function sendEmail(da){
            request({
                method: 'POST',
                url:'http://kohsar.esajee.com/admin/api.php?method=sendEmail&type=post&user_id=1888', 
                form:(da)
            //        json:true
        
            }, function (error, response, body) {
                //        callback(error, response);
                if (!error && response.statusCode == 200) {
                    //        var obj = JSON.parse(body);
                    api.log("email sent getting response body:",'info',body)
                }
            });
        };

        next();
    }
};