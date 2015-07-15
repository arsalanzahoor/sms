exports.task = {
  name:          'processLog',
  description:   'processLog',
  frequency:     0,
  queue:         'default',
  plugins:       [],
  pluginOptions: {},
  
  run: function(api, params, next){
    // your logic here');
//console.log(params.data);
  var request = require('request');
    var delay = 0;
   // api.log('tasks params', 1, params.data.method);
    var requestOptions = {};
    requestOptions.method = 'GET' || params.data.method;
    if(requestOptions.method == 'GET') {
      requestOptions.useQuerystring = true;
      requestOptions.qs = params.data.linkData  || {};
    } else {
      requestOptions.json = true;
      requestOptions.form = params.data.linkData || {};
    }
    requestOptions.url = params.data.url;

   api.log('requestOptions params', 1, requestOptions);

    request(requestOptions, function(error, response, body){
     api.log('response statusCode', 1, response.statusCode, body);
      if(!error && ( response.statusCode == 200 || response.statusCode == 501)) {

        // means we need to callback url
        if(params.trip == 1 && params.data.callback) {
          api.tasks.enqueue("processLog", {data: {url: params.data.callback, method: params.data.callbackMethod, trip: 2, data: params.data.callbackData}}, 'default', function(err, toRun){
  // re enqueued!
        });

        }
      } else {
        // re - try in 1 hour
        params.retry++;

        if(params.retry < 48 ) {
          api.tasks.enqueueIn(1000 * 0.5 * 60, "processLog", params, 'default', function(err, toRun){
  // re enqueued!
        });
 } else {
         // Todo:: send dev user email
         
        }

      }
     // setTimeout(next, 10000);
      next();


//    next();
  });
}
}


