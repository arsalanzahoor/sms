var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

 
var request = require('request');

feed.since = 2690;

// **********You can also set values directly.**********
feed.db            = "http://dev:dev@192.168.1.40:4984/db";
feed.include_docs = true;


//**********Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    //    callback();
   
    var docid = 'testing_put';
    var url = 'http://dev:dev@192.168.1.40:4984/db/'+docid;
    request.get(url, function (error, response, body) {
            
        if (!error && response.statusCode == 200) {
            console.log("the body is:",body);
            var data = JSON.parse(body);
            data.test = 'put_test_updated/modified';
            var rev = data._rev;
            if(rev)
                {
                    url = url+'?rev='+rev;
                    console.log("with rev",url);
                    request({method:'PUT',url:url,body:JSON.stringify(task)},function(err, res, body){
                        if(!err && res.statusCode == 200)
                            {
                                console.log("Document put with rev");
                            }
                            else {
                                console.log(err,res.statusCode);
                            }
                    });
                }
                else {
                    console.log("without rev");
                    request({method:'PUT',url:url,body:JSON.stringify(task)},function(err, res, body){
                        if(!err1 && res1.statusCode == 200)
                            {
                                console.log("Document put without rev");
                            }
                    });
                }
                
            
        }
        else {
            console.log("Document not get","Error Is:",error,"Response Status Is:",response.statusCode);
        }
    });
       
}, 1); 
//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {

    //            console.log(change.seq,change.id);
    var doc =change.doc;
    q.push(doc, function (err) {
        });
})
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
feed.follow();