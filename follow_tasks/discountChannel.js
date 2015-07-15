console.log('In discount Action');
exports.action = {
    name:                   'discountChannel',
    description:            'discountChannel',
    blockedConnectionTypes: [],
    outputExample:          {},
    matchExtensionMimeType: false,
    version:                1.0,
    toDocument:             true,

    inputs: {
        discountid:{
            required: true
        }, 
        enddate: {
            required:true
        } 
    //        url: {
    //            required:true
    //        }
    },

    run: function(api, connection, next){
        // your logic here
        var request = require('request');
        console.log('da:',connection.params);
        var id = JSON.parse(connection.params.discountid);
        
        var url = 'http://192.168.1.40/v2_gulberg/admin/api.php?method=processDiscountStatus&type=post&user_id=1888&discountid='+connection.params.discountid; 
        //        var url = 'http://192.168.1.40/v2_main/admin/ship_report_detail.php?email=1&user_id=1888&ids='+connection.params.id; 
        //        var data = {
        //            'discountid':id
        //        };
        var data = {
//            method:'POST',
            linkData : {
            },
            url : url
        };
        console.log('da2:',typeof url,url,typeof id,id,typeof data,data, 'test');
        //        request({
        //            method: 'POST',
        //            url:url, 
        //            form:(data)
        //        //        json:true
        //            
        //        }, function(er, re, bo){
        //            console.log('Discount Process Result:',data,er,re.statusCode,bo);
        //        });
        var time = JSON.parse(connection.params.enddate);
        time = time*1000;
        api.tasks.enqueueAt(time, "processLog", {
            data:data
        }, 'default', function(err, toRun){
            console.log('err and toRun',err,toRun);
            // re enqueued!
            if(!err){
                connection.response.body = toRun;
            }else {
                connection.response.body = err;
            }
        }); 
        next(connection, true);
    }
};