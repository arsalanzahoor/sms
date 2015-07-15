console.log('In Log Js');
exports.action = {
    name:                   'Log',
    description:            'Log',
    blockedConnectionTypes: [],
    outputExample:          {},
    matchExtensionMimeType: false,
    version:                1.0,
    toDocument:             true,

    inputs: {
        client:{
            required: true
        }, 
        data: {
            required:true
        }
    },

    run: function(api, connection, next){
        // your logic here
        var data = {
            trip: 1
        };
        api.log(typeof connection.params.data,'log');

        //api.log('params data', 1,  connection.body);
        try {
            data = decodeURIComponent(connection.params.data);
            api.log( 'data url', data);
            data = JSON.parse(data);
        //api.log(' data ', data)
        } catch(Exception) {
            api.log('Exception ', 1, Exception.toString());
            next(connection, true);
        }

        if (connection.params.client == 'sms')
        {
            queue = 'sms';
            taskName = 'smsLog';
        }else {
            queue = 'default';
            taskName = 'processLog';
        }
        //    connection.sendMessage(connection,'server message');
        //        var da = JSON.stringify(data);
        //        api.log(da);
        //        api.chatRoom.broadcast("test","smsRoom", da, function(bo){
        //            api.log('bo:',bo); 
        //        });
        api.tasks.enqueue(taskName, {
            data: data, 
            trip: 1, 
            retry: 0
        }, queue, function(err, toRun){
            // enqueued!
            if(err){
                connection.response.error = err;
            } else {
                connection.response.toRun = toRun;
                connection.response.taskName = taskName;
            }
            next(connection, true);
        });


   
    }
};