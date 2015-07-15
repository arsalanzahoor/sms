// If a job with the same name, queue, and args is already running, put this job back in the queue and try later

var smsJobLock = function(worker, func, queue, job, args, options){
  var self = this;
  self.name = 'jobLock';
  self.worker = worker;
  self.queue = queue;
  self.func = func;
  self.job = job;
  self.args = args;
  self.options = options;
}

////////////////////
// PLUGIN METHODS //
////////////////////

smsJobLock.prototype.before_enqueue = function(callback){
  // console.log("** before_enqueue")
  callback(null, true);
}

smsJobLock.prototype.after_enqueue = function(callback){
  // console.log("** after_enqueue")
  callback(null, true);
}

smsJobLock.prototype.before_perform = function(callback){
  // console.log("** before_perform")
  var self = this;
  var key = self.key();
  var now = Math.round(new Date().getTime() / 1000);
  var timeout = now + self.lock_timeout() + 1;
  self.worker.connection.redis.setnx(key, timeout, function(err, setCallback){
    if(setCallback === true || setCallback === 1){
      self.worker.connection.redis.expire(key, self.lock_timeout());
      callback(null, true);
    }else{
      self.reEnqueue(function(){
        callback(null, false);
      });
    }
  });
}

smsJobLock.prototype.after_perform = function(callback){
  // console.log("** after_perform")
  var self = this;
  var key = self.key();
  self.worker.connection.redis.del(key, function(err){
    callback(null, true);
  });
}

/////////////
// HELPERS //
/////////////

smsJobLock.prototype.reEnqueue = function(callback){
  var self = this;
  setTimeout(function(){
    self.worker.queueObject.enqueue(self.queue, self.func, self.args, function(){
      callback();
    });
  }, self.enqueue_timeout() );
}

smsJobLock.prototype.lock_timeout = function(){
  var self = this;
  if (self.options.lock_timeout != null){
    return self.options.lock_timeout;
  }else{
    return 3600; // in seconds
  }
}

smsJobLock.prototype.enqueue_timeout = function(){
  var self = this;
  if (self.options.enqueue_timeout != null){
    return self.options.enqueue_timeout;
  }else{
    return 1001; // in ms
  }
}

smsJobLock.prototype.key = function(){
  var self = this;
  if (self.options.key != null){
    return typeof self.options.key === 'function' ? self.options.key.apply(this) : self.options.key;
  }else{
    // var flattenedArgs = JSON.stringify(self.args);
    return self.worker.connection.key('workerslock', self.func, self.queue);
  }
}

//exports.smsJobLock = smsJobLock;

exports.task = {
  name:          'smsLog',
  description:   'smsLog',
  frequency:     0,
  queue:         'sms',
  plugins:       [smsJobLock],
  pluginOptions: {},
  
  run: function(api, params, next){
    // your logic here');
   api.log('tasks params', 1, params.data.callback);
  var request = require('request');
    var delay = 0;

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

    //api.log('requestOptions params', 1, requestOptions);

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

        if(params.retry < 4 ) {
          api.tasks.enqueueIn(1000 * 0.5 * 60, "smsLog", params, 'default', function(err, toRun){
  // re enqueued!
        });
 } else {
         // Todo:: send dev user email
        }

      }
     //setTimeout(next, 10000);
       next();


//    next();
  });
}
}


