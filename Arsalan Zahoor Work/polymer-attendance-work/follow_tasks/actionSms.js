exports.actionSms = {
    name: 'actionSms',
    description: 'Action for Sending different Messages',
    inputs: {
        room:{
            required:true
        },
        message:{
            required:true
        }
    },

    run: function(api, connection, next){
        console.log('test');
        console.log('room and message:',connection.params.message);
        var msg = JSON.parse(connection.params.message);
        console.log('test',typeof msg,msg.sms,msg.number);
        api.redis.client.HSET("SMS",msg.sms,connection.params.message, function(e, b){
            api.log('e,b:',e,b);
        });
//        api.redis.client.HGETALL('CLOSINGS', function(e,b){
    //            api.log('e and b of HGETALL e:',e,'b:',typeof b,b);
    //            for(var i in b){
    //                var da = JSON.parse(b[i]);
    //                api.log('data:',da,typeof da,da.closingdate);
    //            }
    //        });
//        api.redis.client.EXPIRE("CLOSING",date+'_'+loc+'_'+msg.counter,connection.params.message, 20, function(bo){
//            api.log('bo',bo);
//        });
    //        api.redis.client.HSET("CLOSINGS","DHA2",connection.params.message, function(e, b){
    //            api.log('e,b:',e,b);
    //        });
    //        api.redis.client.HSET("CLOSINGS","DHA3",connection.params.message, function(e, b){
    //            api.log('e,b:',e,b);
    //        });
    //        api.redis.client.HSET("CLOSINGS","KOH1",connection.params.message, function(e, b){
    //            api.log('e,b:',e,b);
    //        });
    //        api.redis.client.HSET("CLOSINGS","KOH2",connection.params.message, function(e, b){
    //            api.log('e,b:',e,b);
    //        });
    //        api.redis.client.HSET("CLOSINGS","KOH3",connection.params.message, function(e, b){
    //            api.log('e,b:',e,b);
    //        });
    //    var r = JSON.parse(connection.params.room);
    //    var m = JSON.parse(connection.params.message);
    //    if(api.chatRoom.exists(connection.params.room, callback) === true ){
    //        api.say(connection.params.room, connection.params.message);
    //    }else {
    //        api.roomAdd(r, function(err){
    //            console.log('err',err);
    //            api.say(r,m);
    //        });
    //    }
        
    //        next();
    }
}
