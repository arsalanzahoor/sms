console.log('In Shipment Action');
exports.action = {
    name:                   'shipmentChannel',
    description:            'shipmentChannel',
    blockedConnectionTypes: [],
    outputExample:          {},
    matchExtensionMimeType: false,
    version:                1.0,
    toDocument:             true,

    inputs: {
        id:{
            required: true
        } ,
        time: {
            required:true
        } 
    //        url: {
    //            required:true
    //        }
    },

    run: function(api, connection, next){
        // your logic here
        console.log('data:',connection.params);
        //        var url = connection.params.url;
        var url = 'http://192.168.1.40/v2_main/admin/ship_report_detail.php?email=1&user_id=1888&ids='+connection.params.id; 
        var data = {
            linkData : {},
            url : url
        };
        var time = JSON.parse(connection.params.time);
        console.log('data2:',typeof url,url,typeof data,data, 'test');
        time = time*1000;
        //        console.log('data3:',typeof time,time);
        api.tasks.enqueueAt(time, "processLog", {
            //        api.tasks.enqueueIn(1000*60*5, "processLog", {
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