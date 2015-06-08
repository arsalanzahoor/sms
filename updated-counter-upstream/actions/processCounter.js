exports.processCounter = {
    name: 'processCounter',
    description: 'Process Counters',
    inputs : {
        post:{
            required:true
        }
    },   
    run: function(api, connection, next){
        connection.response.id = api.id;
        if(connection.params.post.url){
            var url2=connection.params.post.url;
            var reqs=require('request');
            var trim=require('trim');
            var options = {
                url: url2,
                method: 'POST'
            };
            if(connection.params.post.data){
                options.form = connection.params.post.data;
            }
            reqs(options, function(error, response, body) {
                console.log('REQUEST CONNECTION PARAMS POST:',connection.params.post) ;
                connection.response.event = connection.params.post.method;
                connection.response.data = trim(body);
                console.log('REQUEST CONNECTION PARAMS POST METHOD:',connection.params.post.method);
                if(connection.params.post.method == 'getSaleData') {
                    var data = JSON.parse(body);
                    var options = {
                        id:data.serverid
                    };
                    api.elasticSearch(data.serverid, function(error, done){
                        if(error)
                            console.log('ERROR ELASTICSEARCH:',error);
                        console.log('DONE ELASTICSEARCH:',done);
                    });
                    //========================================
                    api.googletrans(data.serverid, function(error, done){
                        if(error)
                            console.log('ERROR GOOGLETRANSFER:',error);
                        console.log('DONE GOOGLETRANSFER:',done);
                    });
                } 
                //========================================
                if (connection.params.post.callbackurl){
                    connection.response.callbackurl = connection.params.post.callbackurl;
                }
                if (connection.params.post.updatesaleurl){
                    connection.response.callbackurl = connection.params.post.updatesaleurl;
                }
                connection.response.actionheroVersion = api.actionheroVersion;
                var now = new Date().getTime();
                connection.response.uptime = now - api.bootTime;
                next(connection, true);
            });
        }
    }
};