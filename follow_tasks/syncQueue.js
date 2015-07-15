exports.action = {
    name:                   'syncQueue',
    description:            'syncQueue',
    blockedConnectionTypes: [],
    outputExample:          {},
    matchExtensionMimeType: false,
    version:                1.0,
    toDocument:             true,

    inputs: {admin:{default:0},payload:{required:true, default:{}}},

            run: function(api, connection, next){
                //console.log(connection.rawConnection.req.body, connection.params);

                try{
                    var payload = JSON.parse(connection.params.payload);
                }catch(e){
                    connection.error = e;
                    next(connection, true);
                }

            if(payload) {
                if (connection.params.admin){
                    var port = 4985;
                    var extra = '_user';
                }
                else {
                    var extra = '';
                    var port = 4984;
                }
               // api.log('info', 1, payload);
                var request = require('request');

                var opt = {};

                // your logic here

                var url = 'http://dev:dev@localhost:4984/db';
                
                if(payload.pkkeyColumn && payload.pkkeyValue ){
                    url = url + '/' + encodeURIComponent(payload.pkkeyColumn+'::'+payload.pkkeyValue);
                    if(payload.pkkeyLocation){
                          url = url + encodeURIComponent('::'+payload.pkkeyLocation);       
                     }
                    var method = 'GET';
                } else {
                    url = url + '/';
                    opt.body = connection.params.payload;
                    var method = 'POST';
                }
                
                
               opt.url = url;
               opt.method =method;

                

                request(opt, function (error, response, body) {

                    if (!error && response.statusCode == 200) {
                        
                        var data = JSON.parse(body);
                      
                        payload._rev = data._rev
                        connection.response.body = body
                    } else {
                        connection.response.error = error
                        
                    }

                    if(method != 'POST') {

                        
                        
                        request({method:'PUT', url:url, body: JSON.stringify( payload)},function(err, res, body){

                           /*api.log("the body is:",1, url, res.statusCode);

                            if(!err && res.statusCode == 200)
                            {
                                api.log("Document put");
                            }
                            else {
                                api.log(err,res.statusCode);
                            }*/
                            if(err){
                                connection.response.error = err

                            } else {
                                connection.response.body = body
                                
                            }
                            next(connection, true);
                            
                        });


                    } else {

                      next(connection, true);
                    }
                });
            }
            
        }
    };
