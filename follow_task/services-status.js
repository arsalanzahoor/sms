var async = require('async');
var request = require('request');
var folder = 'v2_gulberg';
var url = 'http://localhost:3002/api/health';
function task(callback)
{
    request({
        method: 'GET',
        url: url
    }, function (error, response, body) {
        setTimeout(callback, 5*60*1000);
        if (!error && response.statusCode == 200) {
            console.log('Getting Servis Status response:'+ body+ '*******Response Ended...!*******'); // Show the HTML for the Google homepage. 
        }
        else {
            var data = {
                to : 'notify@esajeesolutions.com', 
                subject : 'Service Stop At-'+url, 
                body : JSON.stringify(error)
            };
            request({
                method: 'POST',
                url:'http://192.168.1.41/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
                form:(data)
        
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("Email Send With Error Status",body)
                }
            });
        }
    });
}
async.forever(task, function(err, res) {
    if (err)
        console.log("forever service status error:",err);
    console.log("forever service status response:",res);
//    setTimeout(callback, 5000);
});
